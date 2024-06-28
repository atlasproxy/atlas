import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import node from '@astrojs/node'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
