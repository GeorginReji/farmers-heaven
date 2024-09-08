<template>
	<div class="slider-container">
		<div class="image-slider">
			<el-carousel indicator-position="outside">
				<el-carousel-item
					v-for="(item, index) in images"
					:key="index"
				>
					<div
						:style="{ backgroundImage: `url(${item})` }"
						class="carousel-slide"
					></div>
				</el-carousel-item>
			</el-carousel>
			<el-carousel indicator-position="outside">
				<el-carousel-item
					v-for="(item, index) in images"
					:key="index"
				>
					<div
						:style="{ backgroundImage: `url(${item})` }"
						class="carousel-slide"
					></div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentIndex: 0,
			images: [
				'https://images.unsplash.com/photo-1599536884823-1bc4fb5f9dea?q=80&w=1388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1592457711340-2412dc07b733?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.slider-container {
	width: 100%;
	height: auto;
	text-align: center;
	.image-slider {
		display: flex;
		padding: 2rem 0 0 0;
		.el-carousel {
			width: 50%;
			padding: 1rem;
		}
	}
}

.carousel-slide {
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
}

// Add this media query to hide one carousel on mobile screens
@media screen and (max-width: 767px) {
	.slider-container {
		.image-slider {
			.el-carousel {
				padding: 1rem 0 0 0;
			}
			.el-carousel:nth-child(2) {
				display: none;
			}
			.el-carousel:first-child {
				width: 100%;
			}
		}
	}
}
</style>
