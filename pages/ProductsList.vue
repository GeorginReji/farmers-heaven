<template>
	<el-container
		class="product-list-wrapper"
		v-if="productsList.results"
	>
		<el-row
			class="product-row"
			style="padding-top: 3rem"
		>
			<el-col
				:span="4"
				:xs="12"
				:sm="12"
				:md="6"
				style="padding: 0 10px"
				v-for="product in productsList.results"
				:key="product.id"
			>
				<ProductCard :product="product" />
			</el-col>
		</el-row>
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			layout="total, sizes, prev, pager, next"
			:total="productsList.count"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</el-container>
	<div v-else><h2>productList empty</h2></div>
</template>

<script setup>
definePageMeta({
	middleware: 'default',
});
import { useProductStore } from '@/store/productStore';
const productStore = useProductStore();
const { productsList } = storeToRefs(productStore);

const currentPage = ref(1);
const pageSize = ref(10);

const fetchProducts = () => {
	productStore.fetchProducts({
		page: currentPage.value,
		pageSize: pageSize.value,
	});
};

onMounted(() => {
	fetchProducts();
});

const handleSizeChange = (size) => {
	pageSize.value = size;
	fetchProducts();
};

const handleCurrentChange = (page) => {
	currentPage.value = page;
	fetchProducts();
};
</script>

<style lang="scss" scoped>
.product-list-wrapper {
	padding: 3rem 6rem;
	display: flex;
	flex-direction: column;
	.product-row {
		margin-bottom: 20px;
	}
}
@media only screen and (max-width: 767px) {
	.product-list-wrapper {
		padding: 0;
	}
}
</style>
