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
	// Format the form data
	const images = fileNames.value.map((file, index) => ({
		image: file.image,
		is_thumbnail: index === 0 && file.is_active,
		is_active: file.is_active,
	}));
	const formattedData = {
		items: formData.items.map((item) => ({
			price: Number(item.price),
			name: item.name,
			is_active: true,
		})),
		name: formData.name,
		description: formData.description,
		images: images,
	};
	await productStore.createProducts(formattedData);
};
</script>
