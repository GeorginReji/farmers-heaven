<template>
	<div
		v-if="props.product"
		class="product-card-wrapper"
	>
		<!-- <h1>{{ product.product.images[0].download_url }}</h1> -->
		<el-card shadow="hover">
			<NuxtLink to="/Product">
				<el-image
					:src="
						'http://13.202.12.213/media/' +
						props.product.images[0].download_url
					"
					fit="cover"
				/>
			</NuxtLink>
			<div class="card-content">
				<div class="product-details">
					<div class="product-name">
						<span>{{ product.name }}</span>
					</div>
					<p class="description">
						{{ props.product.description }}
					</p>
				</div>
				<div class="btn-price">
					<span>₹250</span>
					<div class="bottom">
						<el-button
							type="success"
							class="button"
							>Add to <i class="ri-shopping-cart-line"></i
						></el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
const props = defineProps({
	product: Object,
})
</script>

<style lang="scss">
.product-card-wrapper {
	min-width: 10px;
	min-height: 200px;
	.el-card__body {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: #fffbf0;
		padding: 5px 5px;
		&:hover {
			background-color: #fff1de;
		}
	}
	.card-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		span {
			font-size: 1.2em;
			font-weight: 600;
		}
		p {
			padding-bottom: 10px;
			font-size: 1em;
		}
		.product-details {
			min-width: 63%;
			.product-name {
				padding: 1rem 0;
			}
		}
		.btn-price {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			span {
				font-weight: 400;
				font-size: 1em;
			}
		}
	}
	.button {
		i {
			padding-left: 5px;
		}
	}
}
@media (max-width: 767px) {
	.card-content {
		display: flex;
		// flex-direction: column;
		// justify-content: space-between;
		// align-items: center;
	}
	.el-card__body {
		padding: 5px 0;
	}
}
</style>
