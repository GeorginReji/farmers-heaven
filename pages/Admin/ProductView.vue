<template>
	<el-table
		border
		:data="productsList"
	>
		<el-table-column
			min-width="150"
			label="Item"
			prop="thumbnail"
			fixed
		>
			<template #default="scope">
				<el-image
					style="width: 100px; height: 130px"
					preview-teleported
					:src="getImageUrl(scope.row.thumbnail)"
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
		<el-table-column
			fixed="right"
			min-width="120"
		>
			<template #default="scope">
				<el-container>
					<el-button @click="handleUpdate(scope.row)"
						><i class="ri-edit-box-line"
					/></el-button>
					<el-button
						type="danger"
						@click="handleDelete(scope.row)"
						><i class="ri-delete-bin-6-line"
					/></el-button>
				</el-container>
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
const { productsList, fileNames } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());

const handleUpdate = (row) => {
	router.push({
		path: '/admin/UpdateProduct',
		query: { id: row.id },
	});
};

const handleDelete = (row) => {
	console.log('Delete', row);
	const productDeleted = {
		id: row.id,
		item: row.items[0].id,
		is_active: false,
		images: row.images,
	};
	productStore.updateProduct(productDeleted);
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
