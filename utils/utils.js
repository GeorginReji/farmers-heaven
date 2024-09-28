import { useRuntimeConfig } from 'nuxt/app';

const config = useRuntimeConfig();

const getApiBaseUrl = () => {
	return config.public.apiBase;
};

const getImageUrl = (product) => {
	return `${config.public.imageBase + product.download_url}`;
};

export { getApiBaseUrl, getImageUrl };
