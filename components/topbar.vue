<template>
	<div class="topbar">
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
						src="../assets/images/TFH_logo.png"
						alt=""
					/>
				</div>
				<el-menu :router="true">
					<el-menu-item index="/ProductsList">
						<span>Our Products</span>
					</el-menu-item>
					<el-menu-item index="/AboutUs">
						<span>About</span>
					</el-menu-item>
					<el-menu-item index="3">
						<span>Gift Hampers</span>
					</el-menu-item>
					<el-menu-item index="4">
						<span>Gallery</span>
					</el-menu-item>
					<el-menu-item index="5">
						<span>Blog</span>
					</el-menu-item>
					<el-menu-item
						index="6"
						disabled
					>
						<span>Know your Farmer</span>
					</el-menu-item>
				</el-menu>
			</el-drawer>
		</div>
		<div class="social-media">
			<i class="ri-facebook-fill"></i>
			<i class="ri-twitter-x-line"></i>
			<i class="ri-instagram-line"></i>
			<i class="ri-whatsapp-line"></i>
		</div>
		<div
			class="top-bar-logo"
			@click="() => navigateTo({ path: '/' })"
		>
			<img src="~/assets/images/TFH_logo.png" />
		</div>
		<div class="login-icons">
			<!-- List content goes here -->
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
			<!-- <nuxt-link
					class="ar-link"
					v-if="authenticated"
				>
					<i
						class="ri-user-fill"
						@click.prevent="authStore.logout"
						>Logout</i
					>
				</nuxt-link>
				<nuxt-link
					to="/AuthLogin"
					class="ar-link"
					v-else
				>
					<i class="ri-user-fill"></i>Login/Sign-Up
				</nuxt-link> -->
			<!-- </div> -->
			<el-badge
				class="item"
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
	</div>
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
.topbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 2.5rem;
	background-color: #663b2f;
	width: 100%;
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
		display: none;
	}
	.social-media {
		display: flex;
		padding: 5px;
		gap: 10px;
		color: #d9cfcc;
		i:hover {
			cursor: pointer;
		}
	}
	.login-icons {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 2rem;
		padding: 5px;
		.sign-in {
			display: flex;
			gap: 3px;
			white-space: nowrap;
			i {
				padding-right: 5px;
			}
		}
		.cart-icon {
			display: flex;
			gap: 5px;
			i {
				padding-right: 5px;
			}
		}
		.el-button {
			span {
				display: flex;
				gap: 10px;
			}
		}
		.el-button:focus,
		.el-button:hover {
			color: #67c23a;
			border-color: #85ce61;
			outline: 0;
		}
	}
	@media screen and (max-width: 600px) {
		.social-media {
			display: none;
		}
		.top-bar-logo {
			display: flex;
			img {
				height: 70px;
				width: 70px;
				margin-left: 60px;
			}
		}
		.menu-items {
			display: block;
		}
	}
	.item {
		margin-top: 10px;
		margin-right: 10px;
	}
}
</style>
