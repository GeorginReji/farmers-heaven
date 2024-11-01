<template>
	<el-container class="wrapper">
		<el-table
			border
			:data="productsList.results"
		>
			<el-table-column
				min-width="150"
				label="Item"
				prop="thumbnail"
				fixed
			>
				<template #default="scope">
					<el-image
						v-if="scope.row.thumbnail"
						style="width: 100px; height: 130px"
						preview-teleported
						:src="getImageUrl(scope.row.thumbnail)"
					/>
					<el-text v-else>Image not available</el-text>
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
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			layout="total, sizes, prev, pager, next"
			:total="productsList.count"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</el-container>
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
const currentPage = ref(1);
const pageSize = ref(10);

const fetchProducts = () => {
	productStore.fetchProducts({
		page: currentPage.value,
		pageSize: pageSize.value,
	});
};

onMounted(() => {
	fetchProducts();
});

const handleSizeChange = (size) => {
	pageSize.value = size;
	fetchProducts();
};

const handleCurrentChange = (page) => {
	currentPage.value = page;
	fetchProducts();
};
const handleUpdate = (row) => {
	router.push({
		path: '/admin/UpdateProduct',
		query: { id: row.id },
	});
};

const handleDelete = (row) => {
	// console.log('Delete', row);
	const productDeleted = {
		id: row.id,
		item: row.items[0].id,
		is_active: false,
		images: row.images,
	};
	productStore.updateProduct(productDeleted);
	fetchProducts();
};
</script>

<style lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	gap: 3rem;
}
.item-cell {
	padding: 5px 0;
	border-bottom: 1px solid #ebeef5;
}

.item-cell:last-child {
	border-bottom: none;
}
</style>
