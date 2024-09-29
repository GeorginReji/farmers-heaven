import { defineStore } from 'pinia';
import { getApiBaseUrl } from '@/utils/utils';
import { useAuthStore } from './authStore';

export const useProductStore = defineStore({
	id: 'productStore',
	state: () => {
		return {
			productsList: [],
			isLoading: false,
			fileNames: [],
		};
	},
	actions: {
		// Uploading product images with preassigned URL.
		async uploadFile(file, index) {
			return $fetch(`${getApiBaseUrl()}uploads/presigned_url/`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${this.authStore.userDetails.access}`,
					'Content-Type': 'application/json',
				},
				body: {
					file: file.name,
					file_type: file.raw.type,
				},
			})
				.then((response) => {
					// Second POST request using the URL from the first response
					console.log('Preassigned url res', response, index);

					this.fileNames.push({
						id: index,
						fileName: response.file_name,
					});
					return $fetch(response.url, {
						method: 'PUT',
						body: file.raw,
					});
				})
				.then((uploadResponse) => {
					console.log('File uploaded successfully:', uploadResponse);
					return uploadResponse;
				})
				.catch((error) => {
					console.error('Error in file upload process:', error);
					throw error;
				});
		},
		// Remove file from state
		removeFile(fileId) {
			this.fileNames = this.fileNames.filter(
				(file) => file.id !== fileId
			);
		},
		// Creating new Products
		async createProducts(product) {
			const images = this.fileNames.map((file, index) => ({
				image: file.fileName,
				is_thumbnail: index === 0,
			}));
			try {
				await $fetch(`${getApiBaseUrl()}admin/products/`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${this.authStore.userDetails.access}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ ...product, images: images }),
				});
				ElMessage.success('product added successfully');
			} catch (error) {
				console.error('Error creating cart to API:', error);
			}
		},

		async fetchProducts() {
			this.isLoading = true;
			const list = await $fetch(`${getApiBaseUrl()}admin/products/`, {
				method: 'GET',
			});
			this.productsList = list.results;
			this.isLoading = false;
		},
		// Update Products
		async updateProduct(product) {
			try {
				await $fetch(`${getApiBaseUrl()}admin/products/`, {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${this.authStore.userDetails.access}`,
					},
					body: JSON.stringify(product),
				});
				ElMessage.success('product updated successfully');
			} catch (error) {
				console.error('Error creating cart to API:', error);
			}
		},
	},
	getters: {
		authStore() {
			return useAuthStore();
		},
		getProductById: (state) => async (id) => {
			if (state.productsList.length === 0) {
				await state.fetchProducts();
			}
			const numericId = parseInt(id, 10);
			const product = state.productsList.find(
				(product) => product.id === numericId
			);
			return product || null;
		},
	},
});
