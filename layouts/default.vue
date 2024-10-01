<template>
	<el-container class="layout">
		<el-header class="navbar-section">
			<!-- <topbar /> -->
			<navbar />
		</el-header>
		<el-main class="hero-section">
			<slot />
		</el-main>
		<div class="whats-app-container">
			<a href="https://wa.me/8281560102">
				<i class="ri-whatsapp-line"></i>
			</a>
		</div>
		<el-footer class="footer-section">
			<navFooter />
		</el-footer>
	</el-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.layout {
	// display: flex;
	// flex-direction: column;
	// justify-content: space-between;
	.navbar-section {
		position: fixed;
		// display: flex;
		// flex-direction: column;
		// justify-content: space-between;
		// top: 0;
		// left: 0;
		width: 100%;
		z-index: 100;
	}
	.hero-section {
		margin-top: 25px;
		// width: 100%;
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
}
</style>
