<template>
	<el-container>
		<el-header
			v-if="isMobile"
			style="background-color: #fefce8"
		>
			<el-container
				style="font-size: 24px; padding-top: 2rem"
				@click="drawer = true"
			>
				<i class="ri-menu-line" />
			</el-container>
		</el-header>
		<el-drawer
			v-model="drawer"
			size="30%"
			:with-header="false"
		>
			<el-container class="logo">
				<img
					src="../assets/images/TFH_logo.png"
					alt="TFH logo"
				/>
			</el-container>
			<el-menu :router="true">
				<el-menu-item
					v-for="item in menuItems"
					:index="item.index"
				>
					<el-text>{{ item.label }}</el-text>
				</el-menu-item>
			</el-menu>
		</el-drawer>
		<el-container>
			<el-aside
				v-if="!isMobile"
				width="20%"
			>
				<el-menu
					default-active="1"
					router="true"
					class="el-menu-vertical-demo"
				>
					<el-menu-item
						v-for="item in menuItems"
						:index="item.index"
					>
						<el-text :size="isMobile ? 'small' : 'default'">{{
							item.label
						}}</el-text>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<slot />
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(window.innerWidth <= 768);
const drawer = ref(false);

const menuItems = ref([
	{
		index: '/admin',
		label: 'Home',
	},
	{
		index: '/admin/CreateProduct',
		label: 'Add Product',
	},
	{
		index: '/admin/ProductView',
		label: 'Product View',
	},
	{
		index: '/admin/OrderHistory',
		label: 'Order History',
	},
	{
		index: '/',
		label: 'Back',
	},
]);

const handleResize = () => {
	isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
	window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 100%;
}
.logo {
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 50%;
	}
}
</style>
