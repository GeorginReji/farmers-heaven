import { defineStore } from 'pinia';
import useApi from '@/composable/useApi';

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
		/*
		Uploading product images with preassigned URL.
		The uploadFile action is handling a two-step process:
			1. First, it gets a pre-signed URL from your server.
			2. Then, it needs to upload the file directly to that pre-signed URL.
		The second step (uploading to the pre-signed URL) is direct uploading to
		a storage service (like Amazon S3), which doesn't go through your API server.
		This upload often requires specific headers or configurations that might differ
		from your usual API calls. That is why custom $fetch is used.
		*/
		async uploadFile(file) {
			const api = useApi();
			try {
				const response = await api.post('uploads/presigned_url/', {
					file: file.name,
					file_type: file.raw.type,
				});

				this.fileNames.push({
					uid: file.uid,
					image: response.file_name,
					is_active: true,
				});
				// PUT request using the URL from the first response
				await $fetch(response.url, { method: 'PUT', body: file.raw });
			} catch (error) {
				console.error('Error in file upload process', error);
				throw error;
			}
		},

		// Remove file from state
		// deleteFile(fileId) {
		// 	this.fileNames = this.fileNames.filter(
		// 		(file) => file.id !== fileId
		// 	);
		// },

		// Creating new Products
		async createProducts(product) {
			const api = useApi();
			try {
				await api.post('admin/products/', product);
				ElMessage.success('Product added successfully');
				this.fileNames = [];
			} catch (error) {
				console.error('Error creating cart to API:', error);
			}
		},
		// Get all products
		async fetchProducts(params = {}) {
			this.isLoading = true;
			const api = useApi();

			try {
				const response = await api.get('admin/products/', params);
				this.productsList = response;
			} catch (error) {
				ElMessage.error('Error fetching products');
				console.log('Error fetching products', error);
			} finally {
				this.isLoading = false;
			}
		},
		// Update Products
		async updateProduct(product) {
			const api = useApi();
			try {
				await api.put('admin/products/', product);
				ElMessage.success('product updated successfully');
			} catch (error) {
				console.error('Error creating cart to API:', error);
			}
		},
	},
	getters: {
		getProductById: (state) => async (id) => {
			if (state.productsList.length === 0) {
				await state.fetchProducts();
			}
			const numericId = parseInt(id, 10);
			const product = state.productsList.results.find(
				(product) => product.id === numericId
			);
			return product || null;
		},
	},
});
