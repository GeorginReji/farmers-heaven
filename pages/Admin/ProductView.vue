<template>
	<el-table
		border
		:data="productsList"
	>
		<el-table-column
			min-width="180"
			label="Item"
			prop="thumbnail"
		>
			<template #default="scope">
				<el-image
					preview-teleported
					:src="getImageUrl(scope)"
				/>
			</template>
		</el-table-column>
		<el-table-column
			width="180"
			label="Title"
			prop="name"
		/>
		<el-table-column label="Product details">
			<el-table-column label="Price">
				<template #default="scope">
					<div
						v-for="(item, index) in scope.row.items"
						:key="index"
						class="item-cell"
					>
						{{ item.price }}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="Quantity">
				<template #default="scope">
					<div
						v-for="(item, index) in scope.row.items"
						:key="index"
						class="item-cell"
					>
						{{ item.name }}
					</div>
				</template>
			</el-table-column>
		</el-table-column>
		<el-table-column>
			<template #default="scope">
				<el-button @click="handleUpdate(scope.row)">Update</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>
import { useProductStore } from '~/store/productStore';
import { getImageUrl } from '@/utils/utils';

definePageMeta({
	middleware: 'default',
	layout: 'admin-layout',
});

const router = useRouter();
const productStore = useProductStore();
const { productsList } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());

const handleUpdate = (row) => {
	router.push({
		path: '/admin/UpdateProduct',
		query: { id: row.id },
	});
};
</script>

<style lang="scss">
.item-cell {
	padding: 5px 0;
	border-bottom: 1px solid #ebeef5;
}

.item-cell:last-child {
	border-bottom: none;
}
</style>
