import { defineStore } from 'pinia';
import { getApiBaseUrl } from '@/utils/utils';

export const useProductStore = defineStore({
	id: 'productStore',
	state: () => {
		return {
			productsList: [],
		};
	},
	actions: {
		async getProducts() {
			const list = await $fetch(`${getApiBaseUrl()}admin/products/`, {
				method: 'GET',
			});
			this.productsList = list.results;
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
			return product;
		},
	},
});
