<template>
	<el-container>
		<el-row :gutter="20">
			<el-col
				:xs="24"
				:sm="{ span: 12, offset: 1 }"
				:md="{ span: 8, offset: 2 }"
				v-for="product in productsList"
				:key="product.id"
			>
				<ProductCard :product="product" />
			</el-col>
		</el-row>
	</el-container>
</template>

<script setup>
import ProductCard from '~/components/ProductCard.vue';

definePageMeta({
	middleware: 'default',
	layout: 'admin-layout',
});

import { useProductStore } from '~/store/productStore';
const productStore = useProductStore();
const { productsList } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());
</script>

<style lang="scss"></style>
