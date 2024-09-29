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
const { updateProduct, getProductById } = useProductStore();

const existingProduct = ref({});

const productId = route.query.id;

onMounted(async () => {
	if (productId) {
		existingProduct.value = await getProductById(productId);
	}
});

const handleUpdateProduct = async (formData) => {
	await updateProduct(formData);
	navigateTo('/admin/ProductView');
};
</script>
