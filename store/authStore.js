import { defineStore } from 'pinia';
import { useCartStore } from './cartStore';
import useApi from '~/composable/useApi';
export const useAuthStore = defineStore('auth', {
	state: () => ({
		userDetails: null,
		authenticated: false,
		isLoading: true,
	}),
	actions: {
		loadFromLocalStorage() {
			if (process.client) {
				const storedUserDetails = localStorage.getItem('authDetails');

				this.authenticated = !!storedUserDetails;
				this.userDetails = storedUserDetails
					? JSON.parse(storedUserDetails)
					: {};
			} else {
				// Default values for server-side
				this.authenticated = false;
				this.userDetails = {};
			}
		},
		async authStart() {
			this.loading = true;
			const api = useApi();
			const data = await api.get('users/oauth_start');
			console.log('authStart', data);
			// await navigateTo(data.url, { external: true });
		},

		async authUser(code) {
			try {
				console.log('code', code);

				const api = useApi();
				const response = await api.get('users/oauth-callback', {
					code,
				});
				// console.log('auth user response', response);

				ElMessage({
					message: 'Successfully logged in',
					type: 'success',
				});
				this.authenticated = true;
				localStorage.setItem('authDetails', JSON.stringify(response));
				this.userDetails = JSON.stringify(response);
				return true;
			} catch (error) {
				ElMessage({
					message: error.message || 'Authentication failed',
					type: 'error',
				});
				return false;
			} finally {
				this.isLoading = false;
			}
		},
		async logout() {
			const cartStore = useCartStore();

			try {
				// Clear cookies
				const refreshToken = useCookie('refreshToken');
				const accessToken = useCookie('accessToken');
				const user = useCookie('user');

				refreshToken.value = null;
				accessToken.value = null;
				user.value = null;

				// Reset authentication state
				this.authenticated = false;

				ElMessage({
					message: 'Successfully logged out',
					type: 'error',
				});
				localStorage.clear();
				cartStore.cartList = [];
				// Redirect to home page or login page
				navigateTo('/');

				return true;
			} catch (error) {
				ElMessage({
					message: error.message || 'Logout failed',
					type: 'error',
				});
				return false;
			}
		},
	},
});
