<template>
	<ProductForm
		:productData="existingProduct"
		:onSubmit="handleUpdateProduct"
		:isEditing="true"
	/>
</template>

<script setup>
import { useProductStore } from '~/store/productStore';

definePageMeta({
	middleware: 'default',
	layout: 'admin-layout',
});

const route = useRoute();
const { updateProduct, getProductById, fileNames } = useProductStore();

const existingProduct = ref({});

const productId = route.query.id;

onMounted(async () => {
	if (productId) {
		existingProduct.value = await getProductById(productId);
	}
});

const handleUpdateProduct = async (formData) => {
	// destructuring and removing id from fileNames
	const formattedImageData = fileNames.map(({ uid, ...rest }) => rest);
	const formattedFormData = {
		id: productId,
		...formData,
		images: formattedImageData,
	};
	await updateProduct(formattedFormData);
	navigateTo('/admin/ProductView');
};
</script>
