import { build } from 'astro'

await build({})

import Fastify from 'fastify'
import fastifyMiddie from '@fastify/middie'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'node:url'
// @ts-ignore
import { handler as ssrHandler } from './dist/server/entry.mjs'
import { createServer } from 'node:http'
import type { Socket } from 'node:net'
import wisp from 'wisp-server-node'

const app = Fastify({
  serverFactory: () =>
    createServer().on('upgrade', (req, socket: Socket, head) => {
      if (req.url?.startsWith('/wisp/')) socket.destroy()
      wisp.routeRequest(req, socket, head)
    })
})

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL('./dist/client', import.meta.url))
  })
  .register(fastifyMiddie)
await app.use(ssrHandler)

await app.listen({ port: 8080 })
