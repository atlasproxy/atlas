/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import daisythemes from "daisyui/src/theming/themes"
import typography from '@tailwindcss/typography'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [{
			sunset: {
				...daisythemes["sunset"],
				primary: "#38BDF9",
			},
		},],
		logs: false
	},
	plugins: [daisyui, typography],
}
