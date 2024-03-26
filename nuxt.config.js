
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'remixicon/fonts/remixicon.css',
    '@/assets/scss/main.scss',
    '@/assets/scss/elements-custom.scss'
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false
    },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/supabase'
  ]
})
