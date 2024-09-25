import { defineStore } from 'pinia';
import { getApiBaseUrl } from '@/utils/utils';

export const useProductStore = defineStore({
	id: 'productStore',
	state: () => {
		return {
			productsList: [],
			isLoading: false,
		};
	},
	actions: {
		async getProducts() {
			this.isLoading = true;
			const list = await $fetch(`${getApiBaseUrl()}admin/products/`, {
				method: 'GET',
			});
			this.productsList = list.results;
			this.isLoading = false;
		},
	},
	getters: {
		getProductById: (state) => async (id) => {
			if (state.productsList.length === 0) {
				await state.getProducts();
			}
			const numericId = parseInt(id, 10);
			const product = state.productsList.find(
				(product) => product.id === numericId
			);
			return product || null;
		},
	},
});
