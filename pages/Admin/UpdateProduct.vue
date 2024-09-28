<template>
	<ProductForm
		:productData="existingProduct"
		:onSubmit="handleUpdateProduct"
		:isEditing="true"
	/>
</template>

<script setup>
import { useProductStore } from '~/store/productStore';

const { updateProduct, fetchProduct } = useProductStore();

const existingProduct = ref({});

const productId = router.query.id;
onMounted(async () => {
	if (productId) existingProduct.value = await fetchProduct(productId);
});

const handleUpdateProduct = async (formData) => {
	await updateProduct(formData);
};
</script>
