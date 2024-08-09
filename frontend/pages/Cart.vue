<!-- @format -->

<template>
	<div class="cart-wrapper">
		<div class="cart-table">
			<div class="heading">
				<h1>Shopping Cart</h1>
				<span>
					<i class="ri-arrow-right-line"></i>
					Continue Shopping
				</span>
			</div>
			<div
				v-if="cartStore.cartList.length"
				style="width: 100%"
			>
				<el-card v-for="(product, index) in cartStore.cartList">
					<div class="product-info">
						<el-image
							style="width: 100px; height: 100px"
							:src="imageUrl(product.thumbnail.download_url)"
							alt="product image"
							fit="cover"
						/>
						<div class="name">
							<p>{{ product.name }}</p>
							<span>Quantity: 500g</span>
						</div>
						<el-input-number
							v-model="product.count"
							@update:model-value="
								updateItemCount(product.id, $event)
							"
							:min="1"
							:max="10"
						/>
						<h3>{{ `₹${product.price * product.count}` }}</h3>
						<el-button
							circle
							@click="cartStore.removeItem(product.id)"
							><i class="ri-delete-bin-line"></i
						></el-button>
					</div>
				</el-card>
			</div>
			<el-text
				v-else
				size="large"
				tag="b"
				>Cart is Empty</el-text
			>
		</div>
		<el-card
			v-if="cartStore.cartList.length"
			class="cart-summary"
		>
			<h2>Order Summary</h2>
			<div class="row">
				<p>Subtotal</p>
				<h3>{{ `₹${subTotal}` }}</h3>
			</div>
			<div class="row">
				<p>Delivery Fee</p>
				<h3>₹100</h3>
			</div>
			<div class="row">
				<p>GST</p>
				<h3>₹10</h3>
			</div>
			<el-divider />
			<div class="row">
				<p>Total</p>
				<h3>₹810</h3>
			</div>
			<el-button
				style="margin: 0 auto"
				type="success"
				>Proceed to Checkout</el-button
			>
		</el-card>
	</div>
</template>
<script setup>
import { useCartStore } from '@/store/cartStore';

const config = useRuntimeConfig();
const cartStore = useCartStore();

onMounted(async () => {
	await cartStore.loadFromStorage();
});

const imageUrl = (productImgUrl) => {
	return `${config.public.imageBase + productImgUrl}`;
};

const updateItemCount = (productID, count) => {
	cartStore.updateItemCount(productID, count);
};

const subTotal = computed(() => {
	let subtotal = 0;
	cartStore.cartList.forEach((item) => (subtotal += item.price * item.count));
	return subtotal;
});
</script>

<style lang="scss">
.cart-wrapper {
	background-color: #fffbf0;
	display: flex;
	gap: 5rem;
	padding: 5rem;
	.cart-table {
		// border: 1px solid red;
		background-color: white;
		min-width: 350px;
		width: 70%;
		.heading {
			display: flex;
			justify-content: space-between;
			margin-bottom: 3rem;
			padding: 1rem;
			color: #663b2f;
			h1 {
				font-size: 30px;
			}
			span {
				font-size: 14px;
			}
		}
		.el-card {
			.product-info {
				width: 100%;
				// padding: 1rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 1rem;
				.name {
					display: flex;
					flex-direction: column;
					gap: 1rem;
					p {
						font-size: 16px;
						font-weight: 600;
					}
					span {
						color: #747474;
						font-size: 13px;
						font-weight: 600;
					}
				}
				h3 {
					font-size: 16px;
				}
			}
		}
	}
	.cart-summary {
		min-width: 350px;
		background-color: white;
		h2 {
			padding: 1rem;
			color: #663b2f;
		}
		.row {
			padding: 2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p {
				font-size: 14px;
				font-weight: 500;
			}
			h3 {
				font-size: 16px;
			}
		}
		.el-button {
			margin: 0 auto;
			display: block;
		}
	}
}
@media (max-width: 767px) {
	.cart-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
