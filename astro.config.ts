import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'

import { viteStaticCopy } from 'vite-plugin-static-copy'
// @ts-ignore
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";

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
            if (req.url?.endsWith('/wisp/')) {
              wisp.routeRequest(req, socket, head)
              wisp.options.hostname_blacklist = [
                /pornhub\.com/,
                /xvideos\.com/,
                /hentaiheaven\.com/,
                /xhamster\.com/,
                /youporn\.com/
              ]
              logging.level = logging.DEBUG
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
  }
})
