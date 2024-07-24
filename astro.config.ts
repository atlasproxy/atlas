import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import { viteStaticCopy } from 'vite-plugin-static-copy'
// @ts-ignore
import { server as wisp } from '@mercuryworkshop/wisp-js/server'

import node from '@astrojs/node'
import path from 'node:path'

import { uvPath } from '@titaniumnetwork-dev/ultraviolet'
import { baremuxPath } from '@mercuryworkshop/bare-mux/node'
// @ts-expect-error
import { epoxyPath } from '@mercuryworkshop/epoxy-transport'
import { libcurlPath } from '@mercuryworkshop/libcurl-transport'

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
              wisp.options.hostname_blacklist = [/pornhub\.com/, /xvideos\.com/, /hentaiheaven\.com/, /xhamster\.com/, /youporn\.com/]
            }
          })
        }
      },
      viteStaticCopy({
        targets: [
          {
            src: [path.resolve(uvPath, 'uv.bundle.js'), path.resolve(uvPath, 'uv.handler.js'), path.resolve(uvPath, 'uv.client.js'), path.resolve(uvPath, 'uv.sw.js')],
            dest: 'cdn'
          },
          {
            src: [path.resolve(baremuxPath, 'worker.js'), path.resolve(baremuxPath, 'index.js')],
            dest: 'bare-mux'
          },
          {
            src: path.resolve(epoxyPath, 'index.mjs'),
            dest: 'epoxy'
          },
          {
            src: path.resolve(libcurlPath, 'index.mjs'),
            dest: 'libcurl'
          }
        ]
      })
    ]
  },
  output: 'hybrid',
  adapter: node({
    mode: 'middleware'
  })
})
