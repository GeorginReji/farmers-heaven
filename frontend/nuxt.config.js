export default defineNuxtConfig({
																devtools: { enabled: false },
																css: [
																																'remixicon/fonts/remixicon.css',
																																'@/assets/scss/main.scss',
																																'@/assets/scss/elements-custom.scss',
																],
																modules: ['@element-plus/nuxt', '@pinia/nuxt'],
})
