import { defineStore } from 'pinia';
import useApi from '@/composable/useApi';

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
		async fetchOrders({ page, pageSize }) {
			const api = useApi();
			this.isLoading = true;
			try {
				const list = await api.get('orders/make_order', {
					page,
					page_size: pageSize,
				});
				this.orderList = list;
			} catch (error) {
				ElMessage.error('Order fetch error');
				console.log(error);
			} finally {
				this.isLoading = false;
			}
		},
	},
});
