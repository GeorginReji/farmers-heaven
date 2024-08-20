<template>
	<div
		class="product-list-wrapper"
		v-if="productsList"
	>
		<!-- <h1>{{ productsList }}</h1> -->
		<el-row class="product-row">
			<el-col
				:span="4"
				:xs="12"
				:sm="12"
				:md="6"
				style="padding: 0 10px"
				v-for="(product, index) in productsList"
				:key="product.id"
			>
				<ProductCard :product="product" />
			</el-col>
		</el-row>
	</div>
	<div v-else><h2>productList empty</h2></div>
</template>

<script setup>
definePageMeta({
	middleware: 'default',
});
import { useProductStore } from '@/store/productStore';
const dataStore = useProductStore();
const { productsList } = storeToRefs(dataStore);
onMounted(() => {
	dataStore.getProducts();
});
</script>

<style lang="scss" scoped>
.product-row {
	margin-bottom: 20px;
}
.product-list-wrapper {
	padding: 3rem 6rem;
}
@media only screen and (max-width: 767px) {
	.product-list-wrapper {
		padding: 0;
	}
}
</style>
