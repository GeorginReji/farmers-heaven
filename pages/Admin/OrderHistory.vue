<template>
	<el-container style="display: flex; flex-direction: column; gap: 2rem">
		<el-container style="display: flex; justify-content: flex-end">
			<el-button
				@click="updateSelectedRows"
				:disabled="selectedRows.length === 0"
				style="margin-top: 20px"
			>
				Update Status
			</el-button>
		</el-container>
		<el-table
			border
			table-layout="auto"
			@selection-change="handleSelectionChange"
			:data="orderList"
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

const handleSelectionChange = (val) => {
	selectedRows.value = val;
};

const updateSelectedRows = () => {
	console.log(selectedRows.value);
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
.item-cell {
	padding: 5px 0;
	border-bottom: 1px solid #ebeef5;
}

.item-cell:last-child {
	border-bottom: none;
}
</style>
