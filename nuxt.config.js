export default defineNuxtConfig({
	ssr: false,

	runtimeConfig: {
		public: {
			apiBase: process.env.DOMAIN_URL + 'fh-api/v1/',
			imageBase: process.env.DOMAIN_URL + 'media/',
		},
	},

	devtools: { enabled: false },
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern',
				},
			},
		},
	},

	css: [
		'remixicon/fonts/remixicon.css',
		'@/assets/scss/main.scss',
		'@/assets/scss/elements-custom.scss',
	],

	modules: ['@element-plus/nuxt', '@pinia/nuxt'],
	middleware: ['default'],

	build: {
		transpile: ['qs'],
	},

	compatibilityDate: '2024-09-27',
});
