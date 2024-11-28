import { useAuthStore } from '@/store/authStore';
// import { useCartStore } from '@/store/cartStore';

export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();
	// const cartStore = useCartStore();

	// Load authentication status from local storage
	authStore.loadFromLocalStorage();
});
