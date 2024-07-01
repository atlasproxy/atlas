/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import daisythemes from 'daisyui/src/theming/themes'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        atlas: {
          ...daisythemes['night'],
          '--rounded-box': '1.2rem',
          '--rounded-btn': '0.8rem',
          '--rounded-badge': '0.4rem',
          '--tab-radius': '0.7rem'
        }
      }
    ],
    logs: false
  },
  plugins: [daisyui, typography]
}
