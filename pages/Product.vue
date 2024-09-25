<template>
	<div
		class="wrapper"
		v-if="productById"
	>
		<div class="images-wrapper">
			<div class="image-container">
				<el-image
					:src="currImage"
					alt="product image"
					fit="cover"
				/>
			</div>
			<div class="image-list-container">
				<el-button
					@click="scrollPrev"
					round
					style="left: -20px"
				>
					<i class="ri-arrow-left-line"></i>
				</el-button>
				<div
					class="image-list"
					ref="imageListRef"
				>
					<el-image
						v-for="(productImg, index) in productById.images"
						:src="imageUrl(productImg)"
						alt="Slide Image"
						style="width: 100px; height: 100px"
						@click="
							() =>
								(currImage = imageUrl(
									productById.images[index]
								))
						"
						fit="cover"
					/>
				</div>
				<el-button
					@click="scrollNext"
					round
					style="right: -20px"
				>
					<i class="ri-arrow-right-line"></i>
				</el-button>
			</div>
		</div>
		<div class="details-container">
			<div class="title">
				<h1>{{ productById.name }}</h1>
				<h3>₹{{ selectedQuantity.price }}</h3>
			</div>
			<div class="description">
				<p>{{ productById.description }}</p>
			</div>
			<el-radio-group v-model="selectedItemId">
				<el-radio
					v-for="item in productById.items"
					:key="item.id"
					:value="item.id"
					size="large"
					border
					>{{ item.name }}</el-radio
				>
			</el-radio-group>
			<div class="button-wrapper">
				<el-input-number
					v-model="count"
					:min="1"
					:max="10"
				/>
				<el-button
					type="success"
					class="button"
					@click="handlePlaceOrder"
				>
					<el-text style="color: #ffff"
						>Add to <i class="ri-shopping-cart-line"
					/></el-text>
				</el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	middleware: 'default',
});
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '~/store/cartStore';

const cartStore = useCartStore();
const router = useRoute();
const config = useRuntimeConfig();
const productStore = useProductStore();

const productById = ref(null);
const currImage = ref('');
const count = ref(1);
const imageListRef = ref(null);

const selectedItemId = ref(null);

const productId = router.query.id;
onMounted(async () => {
	if (productId) {
		const product = await productStore.getProductById(productId);
		productById.value = product;
		currImage.value = imageUrl(product.images[0]);
		selectedItemId.value = product.items[0].id;
		console.log('product in id', product);
	}
});
const selectedQuantity = computed(() => {
	return productById.value.items.find(
		(item) => item.id === selectedItemId.value
	);
});

const handlePlaceOrder = () => {
	cartStore.addItem(
		{ ...productById.value, product_item_data: selectedQuantity.value },
		1
	);
};

const imageUrl = (product) => {
	return `${config.public.imageBase + product.download_url}`;
};

const scrollNext = () => {
	if (imageListRef.value) {
		imageListRef.value.scrollBy({ left: 200, behavior: 'smooth' });
	}
};
const scrollPrev = () => {
	if (imageListRef.value) {
		imageListRef.value.scrollBy({ left: -200, behavior: 'smooth' });
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	background-color: #fffbf0;
	padding: 2rem 10%;
	display: flex;
	.images-wrapper {
		width: 50%;
		.image-container {
			padding: 3rem;
			min-height: 400px;
			min-width: 300px;
		}
		.image-list-container {
			display: flex;
			align-items: center;
			min-width: 350px;
			.image-list {
				display: flex;
				align-items: center;
				gap: 10px;
				overflow-x: auto;
				scrollbar-width: none;
				position: relative;
				padding: 0 20px;
				.el-image {
					min-height: 100px;
					min-width: 120px;
					&::-webkit-scrollbar {
						display: none;
					}
				}
			}
		}
	}
	.details-container {
		padding: 3rem;
		display: flex;
		flex-direction: column;
		gap: 5rem;
		.title {
			font-size: 2em;
			h3 {
				color: gray;
				font-weight: 400;
			}
		}
		.description {
			font-size: 14px;
		}
		.button-wrapper {
			display: flex;
			gap: 5rem;
		}
	}
}
@media screen and (max-width: 600px) {
	.wrapper {
		display: flex;
		flex-direction: column;
	}
}
</style>
