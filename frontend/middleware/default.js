import { useAuthStore } from '@/store/authStore';
// import { useCartStore } from '@/store/cartStore';

export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useAuthStore();
	// const cartStore = useCartStore();

	// Load authentication status from local storage
	auth.loadFromLocalStorage();

	// Use onNuxtReady for client-side operations
	// if (process.client) {
	// 	onNuxtReady(async () => {
	// 		await cartStore.loadFromStorage();
	// 	});
	// }
});
