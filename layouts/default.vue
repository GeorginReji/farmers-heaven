<template>
	<el-container>
		<el-container class="navbar-section">
			<MenuTopBar />
		</el-container>
		<el-main class="hero-section">
			<slot />
		</el-main>
		<div class="whats-app-container">
			<a href="https://wa.me/7994909555">
				<i class="ri-whatsapp-line" />
			</a>
		</div>
		<el-footer class="footer-section">
			<MenuFooter />
		</el-footer>
	</el-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.navbar-section {
	position: fixed;
	width: 100%;
	z-index: 100;
}
.hero-section {
	margin-top: 25px;
	background-color: #fffbf0;
}
.whats-app-container {
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #25d366;
	text-align: center;
	font-size: 30px;
	line-height: 50px;
	z-index: 100;
	a {
		text-decoration: none;
		color: white;
	}
}
</style>
