import { defineStore } from 'pinia';
import { getApiBaseUrl } from '@/utils/utils';
import { useAuthStore } from './authStore';

export const useCreateProductStore = defineStore({
	id: 'createProductStore',
	state: () => {
		return {
			filePath: [],
		};
	},
	actions: {
		async uploadFile(file) {
			console.log(
				'upload action called',
				this.authStore.userDetails.access,
				file,
				file.raw.type
			);
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
					console.log(response);

					this.filePath.push(response.url);

					// Second POST request using the URL from the first response
					return $fetch(response.url, {
						method: 'PUT',
						body: file.raw, // Assuming file.raw contains the file data
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
		async addProducts(product) {
			try {
				await $fetch(`${getApiBaseUrl()}admin/products/`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${this.authStore.userDetails.access}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(product),
				});
				ElMessage.success('product added successfully');
			} catch (error) {
				console.error('Error creating cart to API:', error);
			}
		},
	},
	getters: {
		authStore() {
			return useAuthStore();
		},
	},
});
