import { consola } from 'consola'
import { build } from 'astro'
import { rimraf } from 'rimraf'

const shouldBuild = process.env.BUILD ?? await consola.prompt('Build frontend?', {
  type: 'confirm'
})

if (shouldBuild) {
  consola.start('Starting frontend build...')
  await rimraf('dist')
  await build({
    logLevel: 'silent',
    vite: {
      logLevel: 'silent'
    }
  })

  consola.success('Build successful')
}

import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyMiddie from '@fastify/middie'
import { server as wisp } from '@mercuryworkshop/wisp-js/server'

import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import path from 'node:path'

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
        socket.destroy()
      })
})

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL('./dist/client', import.meta.url))
  })
  .register(fastifyMiddie)

await app.use(handler)

app.listen({ port }, () => {
  consola.success(`Server listening on http://localhost:${port}`)
})
