<template>
	<ProductForm :onSubmit="createProduct" />
</template>

<script setup>
import { useProductStore } from '~/store/productStore';

const { createProducts } = useProductStore();

const createProduct = async (formData) => {
	await createProducts(formData);
};
</script>
