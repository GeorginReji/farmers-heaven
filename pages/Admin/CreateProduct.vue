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
		image: file.fileName,
		is_thumbnail: index === 0,
	}));
	const formattedData = {
		items: formData.items.map((item) => ({
			price: Number(item.price),
			name: item.name,
			is_active: true,
		})),
		name: formData.title,
		description: formData.desc,
		images: images,
	};
	await productStore.createProducts(formattedData);
};
</script>
