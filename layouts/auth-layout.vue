<template>
	<el-container class="auth-container">
		<div class="auth-content">
			<div
				@click="$router.back()"
				class="btn-back"
			>
				<i class="ri-arrow-left-fill"></i>
			</div>
			<slot />
		</div>
		<div class="art-content">
			<img
				src="../assets/images/TFH_logo.png"
				alt="tgh-logo"
			/>
		</div>
	</el-container>
</template>

<script setup></script>

<style lang="scss">
.auth-container {
	width: 100%;
	min-height: 100vh;
	overflow: hidden;
	background: #e9eaed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.auth-content {
		width: 50%;
		padding: 5rem 10rem;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		.btn-back {
			position: fixed;
			top: 0;
			left: 0;
			background-color: #f0f0f0;
			/* Just for visibility */
			padding: 10px;
			i {
				font-size: 24px;
				// font-weight: lighter;
			}
		}
	}
	.art-content {
		background-color: #ffffff;
		height: 100vh;
		width: 50%;
		flex: 2;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img {
			height: auto;
			width: 50%;
			margin: 0 auto;
		}
	}
	@media screen and (max-width: 800px) {
		.art-content {
			display: none;
		}
		.auth-content {
			width: 100%;
		}
	}
}
</style>
