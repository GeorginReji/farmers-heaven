<template>
	<ProductForm :onSubmit="createProduct" />
</template>

<script setup>
import { useProductStore } from '~/store/productStore';
const productStore = useProductStore();
const { fileNames } = storeToRefs(productStore);
definePageMeta({
	middleware: 'default',
	layout: 'admin-layout',
});

const createProduct = async (formData) => {
	await productStore.createProducts({ ...formData, images: fileNames });
};
</script>
