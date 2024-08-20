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
				<h1>Product title</h1>
				<h3>₹100 - ₹700</h3>
			</div>
			<div class="description">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
				praesentium tenetur mollitia ratione rem sequi voluptas maiores,
				dolor eius dicta deleniti quibusdam quas consequuntur, qui ab
				aperiam, officiis odio accusamus. Lorem ipsum dolor, sit amet
				consectetur adipisicing elit. Ipsum praesentium tenetur mollitia
				ratione rem sequi voluptas maiores, dolor eius dicta deleniti
				quibusdam quas consequuntur, qui ab aperiam, officiis odio
				accusamus.
			</div>
			<el-radio-group v-model="quantityRadio">
				<el-radio
					value="1"
					size="large"
					border
					>200 g</el-radio
				>
				<el-radio
					value="2"
					size="large"
					border
					>500g</el-radio
				>
				<el-radio
					value="3"
					size="large"
					border
					>1kg</el-radio
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
					>Add to <i class="ri-shopping-cart-line"></i
				></el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	middleware: 'default',
});
import { useProductStore } from '@/store/productStore';

const router = useRoute();
const config = useRuntimeConfig();
const productStore = useProductStore();

const productById = ref(null);
const currImage = ref('');
const quantityRadio = ref('1');
const count = ref(1);
const imageListRef = ref(null);

const productId = router.query.id;
onMounted(async () => {
	if (productId) {
		productById.value = await productStore.getProductById(productId);
		currImage.value = imageUrl(productById.value.images[0]);
		console.log('product in id', productById.value, productId);
	}
});
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
				position: relative; // Add this line to position buttons relative to this container
				padding: 0 20px; // Add padding to create space for the buttons inside the container
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
