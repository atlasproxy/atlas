/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ['night']
	},
	plugins: [daisyui],
}
