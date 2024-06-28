import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import node from '@astrojs/node'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import wisp from 'wisp-server-node'
import type { Socket } from 'net'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    solidJs()
  ],
  vite: {
    plugins: [
      {
        name: 'Development Wisp Server',
        configureServer(server) {
          server.httpServer?.on('upgrade', (req, socket, head) => {
            if (req.url?.startsWith('/wisp/')) {
              wisp.routeRequest(req, socket as Socket, head)
            }
          })
        }
      },
      viteStaticCopy({
        targets: [
          {
            src: './node_modules/@titaniumnetwork-dev/ultraviolet/dist/uv.bundle.js',
            dest: 'cdn'
          },
          {
            src: './node_modules/@titaniumnetwork-dev/ultraviolet/dist/uv.client.js',
            dest: 'cdn'
          },
          {
            src: './node_modules/@titaniumnetwork-dev/ultraviolet/dist/uv.handler.js',
            dest: 'cdn'
          },
          {
            src: './node_modules/@titaniumnetwork-dev/ultraviolet/dist/uv.sw.js',
            dest: 'cdn'
          }
        ]
      })
    ]
  },
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
})
