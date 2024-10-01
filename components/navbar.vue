<template>
	<el-container class="navbar">
		<div
			class="top-bar-logo"
			@click="() => navigateTo({ path: '/' })"
		>
			<img src="~/assets/images/TFH_logo.png" />
		</div>
		<el-menu
			mode="horizontal"
			:router="true"
			:ellipsis="false"
			default-active="/"
		>
			<el-menu-item index="/">Home</el-menu-item>
			<el-menu-item index="ProductsList">Our Products</el-menu-item>
			<el-menu-item index="AboutUs">About</el-menu-item>
			<el-menu-item index="3">Gift Hampers</el-menu-item>
			<el-menu-item index="4">Gallery</el-menu-item>
			<!-- <el-menu-item index="5">Blog</el-menu-item> -->
			<!-- <el-menu-item index="6">Know Your Farmer</el-menu-item> -->
		</el-menu>
		<div>
			<el-dropdown
				placement="bottom"
				trigger="click"
			>
				<el-button
					circle
					style="margin-top: 10px"
				>
					<i class="ri-user-fill" />
				</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item v-if="authenticated">{{
							userDetails.user.first_name
								? userDetails.user.first_name
								: 'Null'
						}}</el-dropdown-item>
						<el-dropdown-item v-if="authenticated"
							>Settings</el-dropdown-item
						>
						<el-dropdown-item
							v-if="authenticated"
							@click="authStore.logout"
							>Logout</el-dropdown-item
						>
						<el-dropdown-item
							v-else
							@click="() => navigateTo({ path: '/AuthLogin' })"
							>Login/sign-up</el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<el-badge
				style="margin-top: 10px"
				:value="cartStore.cartList.length"
			>
				<el-button
					circle
					@click="() => navigateTo({ path: '/cart' })"
				>
					<i class="ri-shopping-cart-line"></i>
				</el-button>
			</el-badge>
		</div>
	</el-container>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

const cartStore = useCartStore();

const drawer = ref(false);
const authStore = useAuthStore();
const { authenticated, userDetails } = storeToRefs(authStore);
</script>

<style lang="scss">
.navbar {
	font-size: 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
	.top-bar-logo {
		display: flex;
		padding: 1rem 0 0 1rem;
		img {
			height: 70px;
			width: 70px;
		}
	}
	.el-menu-item {
		img {
			min-width: 100%;
			height: 100px;
			display: flex;
			border-top-left-radius: 20px;
			border-top-right-radius: 20px;
			justify-content: center;
		}
	}
	.el-menu--horizontal.el-menu {
		border-bottom: none;
	}
}
@media screen and (max-width: 600px) {
	.navbar {
		display: none;
	}
}
</style>
