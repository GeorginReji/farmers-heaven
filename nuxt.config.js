
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'remixicon/fonts/remixicon.css',
    '@/assets/scss/main.scss',
    '@/assets/scss/elements-custom.scss'
  ],
  modules: [
    '@element-plus/nuxt'
  ]
})
