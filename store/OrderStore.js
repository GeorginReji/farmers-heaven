import { defineStore } from 'pinia';
import { getApiBaseUrl } from '@/utils/utils';
import { useAuthStore } from './authStore';

export const useOrderStore = defineStore({
	id: 'orderStore',
	state: () => {
		return {
			orderList: [],
			isLoading: false,
		};
	},
	actions: {
		// Fetch Order history
		async fetchOrders() {
			this.isLoading = true;
			try {
				const list = await $fetch(
					`${getApiBaseUrl()}orders/make_order`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.authStore.userDetails.access}`,
						},
					}
				);
				this.orderList = list.results;
			} catch (error) {
				ElMessage.error('Order fetch error');
				console.log(error);
			} finally {
				this.isLoading = false;
			}
		},
	},
	getters: {
		authStore() {
			return useAuthStore();
		},
	},
});
