// composable/useApi.js
export const useApi = () => {
	const config = useRuntimeConfig()

	const apiFetch = (endpoint, options = {}) => {
		return useFetch(endpoint, {
			baseURL: config.public.apiBase,
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
		})
	}

	return {
		get: (endpoint, options) =>
			apiFetch(endpoint, { method: 'GET', ...options }),
		post: (endpoint, body, options) =>
			apiFetch(endpoint, { method: 'POST', body, ...options }),
		put: (endpoint, body, options) =>
			apiFetch(endpoint, { method: 'PUT', body, ...options }),
		delete: (endpoint, options) =>
			apiFetch(endpoint, { method: 'DELETE', ...options }),
	}
}
