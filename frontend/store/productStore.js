import { defineStore } from 'pinia'
import { fetchProducts } from '~/server/productApi'

export const useProductStore = defineStore({
	id: 'productStore',
	state: () => ({
		productsList: null,
	}),
	actions: {
		async getProducts() {
			const list = await $fetch(
				'http://13.202.12.213/fh-api/v1/admin/products/'
			)
			this.productsList = list.results
		},
	},
})
