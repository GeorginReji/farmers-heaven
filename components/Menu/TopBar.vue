<template>
	<el-header class="navbar">
		<div class="menu-items">
			<div
				class="menu-icon-container"
				@click="drawer = true"
			>
				<i class="ri-menu-line"></i>
			</div>
			<el-drawer
				v-model="drawer"
				size="30%"
				title="I am the title"
				:with-header="false"
			>
				<div class="logo">
					<img
						src="~/assets/images/TFH_logo.png"
						alt=""
					/>
				</div>
				<el-menu :router="true">
					<el-menu-item
						v-for="link in menuLinks"
						:index="link.path"
						:disabled="link.isDisabled"
						>{{ link.label }}</el-menu-item
					>
				</el-menu>
			</el-drawer>
		</div>
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
			<el-menu-item
				v-for="link in menuLinks"
				:index="link.path"
				:disabled="link.isDisabled"
				>{{ link.label }}</el-menu-item
			>
		</el-menu>
		<div class="icon-btn-wrapper">
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
				<!-- TODO: Remove the Null issue check from backend -->
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
	</el-header>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

const cartStore = useCartStore();
const drawer = ref(false);
const authStore = useAuthStore();
const { authenticated, userDetails } = storeToRefs(authStore);
const menuLinks = [
	{
		label: 'Home',
		path: '/',
		isDisabled: false,
	},
	{
		label: 'Our Products',
		path: '/ProductsList',
		isDisabled: false,
	},
	{
		label: 'About',
		path: '/AboutUs',
		isDisabled: false,
	},
	{
		label: 'Gift Hampers',
		path: '/Gift Hampers',
		isDisabled: true,
	},
	{
		label: 'Gallery',
		path: '/Gallery',
		isDisabled: true,
	},
	{
		label: 'Blog',
		path: '/Blog',
		isDisabled: true,
	},
	{
		label: 'Know Your Farmer',
		path: '/KnowYourFarmer',
		isDisabled: true,
	},
];
</script>

<style lang="scss">
.navbar {
	position: fixed;
	width: 100%;
	font-size: 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
	.menu-items {
		display: none;
		.menu-icon-container {
			i {
				font-size: 24px;
			}
		}
		.el-button {
			color: white;
		}
		.el-drawer {
			.logo {
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 50%;
				}
			}
			.el-menu {
				border-right: none;
			}
			.el-sub-menu__title {
				padding: 0;
			}
			.el-menu-item {
				padding: 0;
			}
		}
	}
	.top-bar-logo {
		display: flex;
		padding: 1rem 0 0 1rem;
		img {
			height: 55px;
			width: 55px;
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
	.icon-btn-wrapper {
		display: flex;
		gap: 1rem;
	}
}
@media screen and (max-width: 600px) {
	.navbar {
		position: relative;
		.el-menu {
			display: none;
		}
		.menu-items {
			display: block;
			.el-menu {
				display: block;
			}
		}
		.top-bar-logo {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
		.icon-btn-wrapper {
			position: absolute;
			right: 1rem;
			top: 50%;
			gap: 1rem;
			transform: translateY(-50%);
		}
	}
}
</style>
