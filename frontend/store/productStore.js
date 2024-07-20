import { defineStore } from 'pinia';
import { getApiBaseUrl } from '@/utils/utils';

export const useProductStore = defineStore({
	id: 'productStore',
	state: () => ({
		productsList: null,
	}),
	actions: {
		async getProducts() {
			const list = await $fetch(`${getApiBaseUrl()}admin/products/`, {
				method: 'GET',
			});
			this.productsList = list.results;
		},
	},
});
