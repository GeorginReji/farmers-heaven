<template>
	<ProductForm :onSubmit="createProduct" />
</template>

<script setup>
import { useProductStore } from '~/store/productStore';
const { createProducts } = useProductStore();

definePageMeta({
	middleware: 'default',
	layout: 'admin-layout',
});

const createProduct = async (formData) => {
	await createProducts(formData);
};
</script>
