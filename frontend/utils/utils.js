import { useRuntimeConfig } from 'nuxt/app'

const getApiBaseUrl = () => {
    const config = useRuntimeConfig()
    return config.public.apiBase
  }

export { getApiBaseUrl }