import { consola } from 'consola'
import { build } from 'astro'

const shouldBuild = await consola.prompt('Build frontend?', {
  type: 'confirm'
})

if (shouldBuild) await build({})

import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyMiddie from '@fastify/middie'
import { server as wisp } from '@mercuryworkshop/wisp-js/server'

import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import pico from 'picocolors'

// @ts-ignore
const { handler } = await import('./dist/server/entry.mjs')

wisp.options.hostname_blacklist = [/pornhub\.com/]

const port = Number(process.env.PORT) || 8080

const app = Fastify({
  serverFactory: (handler) =>
    createServer()
      .on('request', handler)
      .on('upgrade', (req, socket, head) => {
        if (req.url?.startsWith('/wisp/')) return wisp.routeRequest(req, socket, head)
        else socket.destroy()
      })
})

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL('./dist/client', import.meta.url))
  })
  .register(fastifyMiddie)

app.use(handler)

app.listen({ port }, () => {
  console.log(`${pico.bold(`⛰️ Atlas ${pico.blue(pico.inverse(' 1.0.0 '))}`)} 
  → ${pico.gray(`Listening on http://localhost:${port}`)}`)
})
