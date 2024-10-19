import { useAuthStore } from '@/store/authStore';
import { getApiBaseUrl } from '@/utils/utils';

export default function useApi() {
	const authStore = useAuthStore();

	// This is a reusable API function with default value of method GET, data as null and customHeaders as {}
	const api = async (
		endpoint,
		method = 'GET',
		data = null,
		customHeaders = {}
	) => {
		const headers = {
			'Content-Type': 'application/json',
			...customHeaders,
		};

		if (authStore.userDetails.access) {
			headers.Authorization = `Bearer ${authStore.userDetails.access}`;
		}

		const config = {
			method,
			headers,
		};

		if (data) {
			if (method === 'GET') {
				config.query = data;
			} else {
				config.body = JSON.stringify(data);
			}
		}

		try {
			return await $fetch(`${getApiBaseUrl()}${endpoint}`, config);
		} catch (error) {
			console.error(`API Error (${method} ${endpoint}):`, error);
			throw error;
		}
	};

	return {
		get: (endpoint, query) => api(endpoint, 'GET', query),
		post: (endpoint, data) => api(endpoint, 'POST', data),
		put: (endpoint, data) => api(endpoint, 'PUT', data),
		delete: (endpoint) => api(endpoint, 'DELETE'),
	};
}
