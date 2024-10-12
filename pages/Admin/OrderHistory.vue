<template>
	<el-container class="wrapper">
		<el-table
			border
			table-layout="auto"
			@selection-change="handleSelectionChange"
			:data="orderList.results"
		>
			<el-table-column
				type="selection"
				width="50"
			/>
			<template v-for="tableColumn in tableColumns">
				<el-table-column
					v-if="tableColumn.Prop !== 'items'"
					:fixed="tableColumn.fixed"
					:prop="tableColumn.Prop"
					:label="tableColumn.Label"
					:min-width="tableColumn.minWidth"
				/>
				<el-table-column
					v-if="tableColumn.Prop === 'items'"
					:fixed="tableColumn.fixed"
					:prop="tableColumn.Prop"
					:label="tableColumn.Label"
					:min-width="tableColumn.minWidth"
				>
					<el-table-column label="Item name">
						<template #default="scope">
							<div
								v-for="(item, index) in scope.row.items"
								:key="index"
								class="item-cell"
							>
								{{ item.product_data.name }}
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
								{{ item.amount }}
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
								{{ item.quantity }}
							</div>
						</template>
					</el-table-column>
				</el-table-column>
			</template>

			<!-- <el-table-column
				fixed="right"
				label="Operations"
				min-width="120"
			>
				<template #default>
					<el-button
						link
						type="primary"
						size="small"
						>Status Update</el-button
					>
				</template>
			</el-table-column> -->
		</el-table>
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[10, 20, 50, 100]"
			layout="total, sizes, prev, pager, next"
			:total="orderList.count"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</el-container>
</template>

<script setup>
import { useOrderStore } from '@/store/OrderStore';
const orderStore = useOrderStore();
const { orderList } = storeToRefs(orderStore);

definePageMeta({
	middleware: 'default',
	layout: 'admin-layout',
});

const selectedRows = ref([]);

onMounted(() => orderStore.fetchOrders());

const currentPage = ref(1);
const pageSize = ref(10);

const fetchOrders = () => {
	orderStore.fetchOrders({
		page: currentPage.value,
		pageSize: pageSize.value,
	});
};

onMounted(() => {
	fetchOrders();
});

const handleSizeChange = (size) => {
	pageSize.value = size;
	fetchOrders();
};

const handleCurrentChange = (page) => {
	currentPage.value = page;
	fetchOrders();
};

const handleSelectionChange = (val) => {
	selectedRows.value = val;
};

const tableColumns = [
	{
		Prop: 'name',
		Label: 'User',
		minWidth: '100',
		fixed: false,
	},
	{
		Prop: 'items',
		Label: 'Items',
		minWidth: '200',
		fixed: false,
	},
	{
		Prop: 'total_amount',
		Label: 'Order Value',
		minWidth: '100',
		fixed: false,
	},
	{
		Prop: 'address',
		Label: 'Address',
		minWidth: '150',
		fixed: false,
	},
];
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
