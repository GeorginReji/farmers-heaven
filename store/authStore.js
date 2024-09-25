import { defineStore } from 'pinia';
import { getApiBaseUrl } from '~/utils/utils';
import { useCartStore } from './cartStore';
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
			const data = await $fetch(`${getApiBaseUrl()}users/oauth_start`, {
				method: 'GET',
			});
			console.log('redirect url', data);
			await navigateTo(data.url, { external: true });
			// navigateTo({ path: '/' });
		},

		async autUser(code) {
			try {
				const response = await $fetch(
					`${getApiBaseUrl()}users/oauth-callback`,
					{
						method: 'GET',
						query: { code },
					}
				);
				ElMessage({
					message: 'Successfully logged in',
					type: 'success',
				});
				const refreshToken = useCookie('refreshToken', {
					maxAge: 60 * 60 * 24 * 2,
				}); // 2 days
				refreshToken.value = response.refresh;

				const accessToken = useCookie('accessToken', {
					maxAge: 60 * 60 * 24,
				}); // 1 day
				accessToken.value = response.access;

				const user = useCookie('user', { maxAge: 60 * 60 * 24 }); // 1 day
				user.value = JSON.stringify(response.user);
				this.authenticated = true;
				localStorage.setItem('authDetails', JSON.stringify(response));
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
