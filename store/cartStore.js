import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import useApi from '~/composable/useApi';

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
		loadFromLocalStorage() {
			const storedCart = localStorage.getItem('cart');
			this.cartList = storedCart ? JSON.parse(storedCart) : [];
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
				console.log('added product', item);

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
				this.loadFromLocalStorage();
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
				await this.createProductQuantityMap(formattedCartData);
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
				const promises = cartData.map((item) =>
					api.get('admin/products/', {
						id: item.product,
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
				console.log('quantity map', quantityMap);

				this.quantityMap = quantityMap;
			} catch (error) {
				ElMessage.error('Error fetching products for cart map');
				console.log('Error fetching products', error);
			}
		},
	},
});
