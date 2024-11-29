import { defineStore } from 'pinia';
import useApi from '@/composable/useApi';
import { useCartStore } from './cartStore';

export const useOrderStore = defineStore({
	id: 'orderStore',
	state: () => {
		return {
			orderList: [],
			statesList: [],
			cityList: [],
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
		async confirmOrder(item) {
			const { fetchCart } = useCartStore();
			try {
				const api = useApi();
				api.post('orders/make_order/', item);
				ElMessage({
					message: 'Your order is confirmed.',
					type: 'success',
				});
			} catch (error) {
				console.error('Error in confirming order:', error);
				ElMessage({
					message: 'Error making order.',
					type: 'error',
				});
			} finally {
				await fetchCart();
			}
		},
		async fetchStates() {
			try {
				const api = useApi();
				const dataList = await api.get('admin/state');
				this.statesList = dataList.results;
			} catch (error) {
				console.error('Error fetching states from API:', error);
			}
		},
		async fetchCity() {
			try {
				const api = useApi();
				const dataList = await api.get('admin/city');
				this.cityList = dataList.results;
			} catch (error) {
				console.error('Error fetching city from API:', error);
			}
		},
	},
});
