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
						<span>{{
							product.name + '(' + selectedItem.name + ')'
						}}</span>
					</div>
					<p class="description">
						{{
							props.product.description.substring(0, 100) + '...'
						}}
					</p>
				</div>
				<div class="btn-price">
					<el-dropdown
						size="small"
						split-button
						type="default"
					>
						{{ selectedItem.price }}
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item
									v-for="item in product.items"
									@click="selectedItem = item"
									>{{ item.name }}</el-dropdown-item
								>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
					<div class="bottom">
						<el-button
							type="success"
							class="button"
							@click="handleAddToCart"
							>Add to <i class="ri-shopping-cart-line"></i
						></el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { useCartStore } from '~/store/cartStore';
import { getImageUrl } from '~/utils/utils';

const cartStore = useCartStore();
const props = defineProps({
	product: Object,
});
const selectedItem = ref(props.product.items[0]);

// Get already existing count in cart.
const getProductQuantityInCart = (productId, itemId) => {
	let itemCount = 0;
	cartStore.cartList.forEach((item) => {
		if (
			item.product === productId &&
			item.product_item_data.id === itemId
		) {
			itemCount = item.count;
		}
	});
	return itemCount;
};

// If product already exists in cart get the product count and increment
const handleAddToCart = () => {
	let countInCart = getProductQuantityInCart(
		props.product.id,
		selectedItem.value.id
	);
	countInCart++;

	cartStore.addItem(
		{ ...props.product, product_item_data: selectedItem.value },
		countInCart
	);
};

const imageUrl = computed(() => getImageUrl(props.product.thumbnail));
</script>

<style lang="scss">
.product-card-wrapper {
	// min-width: 10px;
	// min-height: 200px;
	margin-bottom: 16px;
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
		padding: 0 2rem;
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
