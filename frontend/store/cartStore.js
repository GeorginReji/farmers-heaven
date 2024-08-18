import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartList: [],
		statesList: [],
		cityList: [],
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

		addItem(item, count) {
			console.log('add item cart list', this.cartList);

			const existingItemIndex = this.cartList.findIndex(
				(product) => product.id === item.id
			);

			if (existingItemIndex === -1) {
				this.cartList.push({ ...item, count });
			} else {
				this.cartList[existingItemIndex] = {
					...this.cartList[existingItemIndex],
					count: this.cartList[existingItemIndex].count + count,
				};
			}

			this.saveToLocalStorage();
			if (this.authStore.authenticated) {
				this.createCart({
					product: item.id,
					quantity: count,
				});
			}
		},
		updateItemCount(productId, newCount) {
			console.log('Increment count', productId, newCount);

			if (this.cartList.length) {
				this.saveToLocalStorage();
				if (this.authStore.authenticated)
					this.updateCart({
						product: productId,
						quantity: newCount,
						is_active: true,
					});
			}
		},
		async removeItem(product) {
			console.log('Remove cart', this.cartList, product.id);

			this.cartList = this.cartList.filter(
				(item) => item.id !== product.id
			);
			this.saveToLocalStorage();
			// TODO remove item API check
			if (this.authStore.authenticated)
				this.updateCart({
					product: product.id,
					quantity: 0,
					is_active: false,
				});
		},
		async loadFromStorage() {
			if (this.authStore.authenticated) {
				this.fetchCart();
			} else {
				this.loadFromLocalStorage();
			}
		},
		async createCart(item) {
			try {
				await $fetch(`${getApiBaseUrl()}orders/cart/`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${this.authStore.userDetails.access}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(item),
				});
			} catch (error) {
				console.error('Error creating cart to API:', error);
			} finally {
				this.fetchCart();
			}
		},
		async fetchCart() {
			try {
				const data = await $fetch(`${getApiBaseUrl()}orders/cart`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${this.authStore.userDetails.access}`,
					},
				});
				const formattedCartData = data.results.map((item) => ({
					id: item.product,
					count: item.quantity,
					...item.product_data,
				}));
				this.cartList = formattedCartData;
				console.log('cart after mapping', formattedCartData);
			} catch (error) {
				console.error('Error fetching cart from API:', error);
			}
		},
		async updateCart(item) {
			try {
				await $fetch(`${getApiBaseUrl()}orders/cart/`, {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${this.authStore.userDetails.access}`,
					},
					body: JSON.stringify(item),
				});
				await this.fetchCart();
			} catch (error) {
				console.error('Error Updating cart to API:', error);
			}
		},
		async confirmOrder(item) {
			try {
				await $fetch(`${getApiBaseUrl()}orders/make_order/`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${this.authStore.userDetails.access}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(item),
				});
			} catch (error) {
				console.error('Error in confirming order:', error);
			} finally {
				this.fetchCart();
			}
		},
		async fetchStates() {
			try {
				const data = await $fetch(`${getApiBaseUrl()}/admin/state`, {
					method: 'GET',
				});
				// console.log('states list', data);
				this.statesList = data.results;
			} catch (error) {
				console.error('Error fetching cart from API:', error);
			}
		},
		async fetchCity() {
			try {
				const data = await $fetch(`${getApiBaseUrl()}/admin/city`, {
					method: 'GET',
				});
				// console.log('city list', data);
				this.cityList = data.results;
			} catch (error) {
				console.error('Error fetching cart from API:', error);
			}
		},
	},
});
