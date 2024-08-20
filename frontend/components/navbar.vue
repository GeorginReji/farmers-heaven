<!-- @format -->

<template>
	<div class="navbar">
		<el-menu
			mode="horizontal"
			:router="true"
			:ellipsis="false"
			default-active="/"
		>
			<el-menu-item index="ProductsList">Our Products</el-menu-item>
			<el-menu-item index="AboutUs">About</el-menu-item>
			<el-menu-item index="3">Gift Hampers</el-menu-item>
			<el-menu-item index="/">
				<img
					src="../assets/images/TFH_logo.png"
					alt="TFH Logo"
					fit="cover"
				/>
			</el-menu-item>
			<el-menu-item index="4">Gallery</el-menu-item>
			<el-menu-item index="5">Blog</el-menu-item>
			<el-menu-item index="6">Know Your Farmer</el-menu-item>
		</el-menu>
	</div>
</template>

<script setup></script>

<style lang="scss">
.navbar {
	font-size: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 50px;
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
}
@media screen and (max-width: 600px) {
	.navbar {
		display: none;
	}
}
</style>
