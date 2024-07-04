import { defineStore } from 'pinia'
import { authUser } from '~/server/authServices'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authenticated: false,
		loading: false,
	}),
	actions: {
		async authenticateUser() {
			this.loading = true
			const { data, error } = await authUser()
			console.log('redirect url', data)

			// if (data.value) {
			// 	const token = useCookie('token') // useCookie new hook in nuxt 3
			// 	token.value = data?.value?.token // set token to cookie
			// 	this.authenticated = true // set authenticated  state value to true
			// }
			// this.loading = false
		},
		// logUserOut() {
		// 	const token = useCookie('token') // useCookie new hook in nuxt 3
		// 	this.authenticated = false // set authenticated  state value to false
		// 	token.value = null // clear the token cookie
		// },
	},
})
