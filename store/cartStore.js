import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import useApi from '~/composable/useApi';
import { getApiBaseUrl } from '@/utils/utils';

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartList: [],
		quantityMap: {},
	}),
	getters: {
		authStore() {
			return useAuthStore();
		},
	},
	actions: {
		// Load data from local storage
		async loadFromLocalStorage() {
			const storedCart = localStorage.getItem('cart');
			this.cartList = storedCart ? JSON.parse(storedCart) : [];
			await this.createProductQuantityMap(this.cartList);
		},

		// Save data to local storage
		saveToLocalStorage() {
			localStorage.setItem('cart', JSON.stringify(this.cartList));
		},
		// Add an Item to the cart
		async addItem(item, count) {
			const existingItemIndex = this.cartList.findIndex(
				(product) =>
					product.id === item.id &&
					product.product_item_data.id === item.product_item_data.id
			);

			if (existingItemIndex === -1) {
				this.cartList.push({ ...item, count });
			} else {
				this.cartList[existingItemIndex] = {
					...this.cartList[existingItemIndex],
					count: count,
				};
			}

			this.saveToLocalStorage();
			if (this.authStore.authenticated) {
				await this.createCart({
					product: item.id,
					quantity: count,
					product_item: item.product_item_data.id,
				});
			}
		},

		async loadFromStorage() {
			if (this.authStore.authenticated) {
				await this.fetchCart();
			} else {
				await this.loadFromLocalStorage();
			}
		},
		async createCart(item) {
			const api = useApi();
			try {
				await api.post('orders/cart/', item);
			} catch (error) {
				console.error('Error creating cart to API:', error);
			} finally {
				await this.fetchCart();
			}
		},
		async synLocalStorageCart(token) {
			try {
				let storedCart = localStorage.getItem('cart');
				storedCart = storedCart ? JSON.parse(storedCart) : [];
				if (storedCart.length) {
					const cartPromise = storedCart.map((item) =>
						$fetch(`${getApiBaseUrl()}orders/cart/`, {
							method: 'POST',
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								product: item.id,
								quantity: item.count,
								product_item: item.product_item_data.id,
							}),
						})
					);
					await Promise.all(cartPromise);
					console.log('Cart store data updated');
				}
			} catch (error) {
				console.error('Error in localstorage sync', error);
			}
		},
		async fetchCart() {
			const api = useApi();
			try {
				const data = await api.get('orders/cart');
				const formattedCartData = data.results.map((item) => ({
					id: item.id,
					product: item.product,
					count: item.quantity,
					...item.product_data,
					product_item_data: item.product_item_data,
				}));
				this.cartList = formattedCartData;
			} catch (error) {
				console.error('Error fetching cart from API:', error);
			}
		},

		async updateCart(item) {
			const api = useApi();
			try {
				api.put('orders/cart/', item);
				await this.fetchCart();
			} catch (error) {
				console.error('Error Updating cart to API:', error);
			}
		},
		// create quantity hashmap for quantity of products cart
		async createProductQuantityMap(cartData) {
			const api = useApi();
			try {
				const promises = cartData.map(
					async (item) =>
						await api.get('admin/products/', {
							id: this.authStore.authenticated
								? item.product
								: item.id,
						})
				);
				const responses = await Promise.all(promises);

				// Extract the results array from each response and flatten to single array
				const productsArray = responses.flatMap(
					(response) => response.results
				);

				// Create map from the products array
				const quantityMap = productsArray.reduce((map, product) => {
					map[product.id] = product.items;
					return map;
				}, {});

				this.quantityMap = quantityMap;
			} catch (error) {
				ElMessage.error('Error fetching products for cart map');
				console.log('Error fetching products', error);
			}
		},
	},
});
