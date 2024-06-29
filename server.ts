import { build } from 'astro'

await build({})

import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import type { Socket } from 'node:net'
// @ts-ignore
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
logging.level = logging.DEBUG;
wisp.options.hostname_blacklist = [
  /pornhub\.com/,
]
const app = Fastify({
  serverFactory: () =>
    createServer().on('upgrade', (req, socket: Socket, head) => {
      if (req.url?.startsWith('/wisp/')) return wisp.routeRequest(req, socket, head)
      else socket.destroy()
    })
})

await app.register(fastifyStatic, {
  root: fileURLToPath(new URL('./dist/client', import.meta.url))
})

await app.listen({ port: 8080 })
