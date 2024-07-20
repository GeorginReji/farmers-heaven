export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBase: process.env.DOMAIN_URL+'fh-api/v1/',
			imageBase: process.env.DOMAIN_URL+'/media/'
		},
	},
	devtools: { enabled: false },
	css: [
		'remixicon/fonts/remixicon.css',
		'@/assets/scss/main.scss',
		'@/assets/scss/elements-custom.scss',
	],
	modules: ['@element-plus/nuxt', '@pinia/nuxt'],
	build: {
		transpile: ['qs']
	}
})
