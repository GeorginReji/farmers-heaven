<!-- @format -->

<template>
	<div class="hero-section">
		<slider />
	</div>
	<div class="product-row">
		<el-divider />
		<h2>Bestsellers products</h2>
		<el-row :gutter="20">
			<el-col
				:span="5"
				:xs="12"
				:sm="6"
				:md="6"
			>
				<ProductCard />
			</el-col>
			<el-col
				:span="5"
				:xs="12"
				:sm="6"
				:md="6"
			>
				<ProductCard />
			</el-col>
			<el-col
				:span="5"
				:xs="12"
				:sm="6"
				:md="6"
			>
				<ProductCard />
			</el-col>
			<el-col
				:span="5"
				:xs="12"
				:sm="6"
				:md="6"
			>
				<ProductCard />
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore';
definePageMeta({
	middleware: 'default',
});
const cartStore = useCartStore();
onMounted(async () => {
	await cartStore.loadFromStorage();
});
</script>

<style lang="scss" scoped>
h2 {
	font-size: xx-large;
	padding-bottom: 10px;
}
.hero-section {
	width: 100%;
}
.product-row {
	padding: 0 5rem;
}
</style>
