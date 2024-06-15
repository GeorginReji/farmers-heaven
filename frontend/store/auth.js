import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authenticated: false,
		loading: false,
	}),
	actions: {
		async authenticateUser({ username, password }) {
			this.loading = true
			const data = await $fetch('https://dummyjson.com/auth/login', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					password,
				}),
			})

			if (data.value) {
				const token = useCookie('token') // useCookie new hook in nuxt 3
				token.value = data?.value?.token // set token to cookie
				this.authenticated = true // set authenticated  state value to true
			}
			this.loading = false
		},
		logUserOut() {
			const token = useCookie('token') // useCookie new hook in nuxt 3
			this.authenticated = false // set authenticated  state value to false
			token.value = null // clear the token cookie
		},
	},
})
