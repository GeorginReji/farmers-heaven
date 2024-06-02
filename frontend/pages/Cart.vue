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
			<el-card>
				<div class="product-info">
					<el-image
						style="width: 100px; height: 100px"
						src="https://picsum.photos/id/154/800/800"
						alt="product image"
						fit="cover"
					/>
					<div class="name">
						<p>Product Name</p>
						<span>Quantity: 500g</span>
					</div>
					<el-input-number
						v-model="quantity"
						:min="1"
						:max="10"
					/>
					<h3>₹700</h3>
					<el-button circle
						><i class="ri-delete-bin-line"></i
					></el-button>
				</div>
			</el-card>
			<el-card>
				<div class="product-info">
					<el-image
						style="width: 100px; height: 100px"
						src="https://picsum.photos/id/154/800/800"
						alt="product image"
						fit="cover"
					/>
					<div class="name">
						<p>Product Name</p>
						<span>Quantity: 500g</span>
					</div>
					<el-input-number
						v-model="quantity"
						:min="1"
						:max="10"
					/>
					<h3>₹700</h3>
					<el-button circle
						><i class="ri-delete-bin-line"></i
					></el-button>
				</div>
			</el-card>
		</div>
		<el-card class="cart-summary">
			<h2>Order Summary</h2>
			<div class="row">
				<p>Subtotal</p>
				<h3>₹700</h3>
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
const quantity = ref(1)
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
