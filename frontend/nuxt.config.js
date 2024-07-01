export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBase: process.env.API_BASE_URL || 'http://localhost:3000',
		},
	},
	devtools: { enabled: false },
	css: [
		'remixicon/fonts/remixicon.css',
		'@/assets/scss/main.scss',
		'@/assets/scss/elements-custom.scss',
	],
	modules: ['@element-plus/nuxt', '@pinia/nuxt'],
})
