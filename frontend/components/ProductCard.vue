<template>
	<div
		v-if="props.product"
		class="product-card-wrapper"
	>
		<el-card shadow="hover">
			<NuxtLink
				:to="{ name: 'Product', query: { id: props.product.id } }"
			>
				<el-image
					:src="imageUrl"
					fit="cover"
				/>
			</NuxtLink>
			<div class="card-content">
				<div class="product-details">
					<div class="product-name">
						<span>{{ product.name }}</span>
					</div>
					<p class="description">
						{{
							props.product.description.substring(0, 100) + '...'
						}}
					</p>
				</div>
				<div class="btn-price">
					<span>₹250</span>
					<div class="bottom">
						<el-button
							type="success"
							class="button"
							@click="cartStore.addItem(props.product, 1)"
							>Add to <i class="ri-shopping-cart-line"></i
						></el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app';
import { useCartStore } from '~/store/cartStore';

const cartStore = useCartStore();
const config = useRuntimeConfig();
const props = defineProps({
	product: Object,
});

const imageUrl = computed(() => {
	return `${config.public.imageBase + props.product.thumbnail.download_url}`;
});
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
