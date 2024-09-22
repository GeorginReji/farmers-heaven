<template>
	<div class="main">
		<h1>About Us</h1>
		<div class="container">
			<div class="text-container">
				<h3>Who are we?</h3>
				At The Farmer's Haven, we celebrate the heart and soul of
				farming. Born from a passion for fresh, local produce, our brand
				connects farmers with communities, ensuring every product tells
				a story of dedication and sustainability. We believe in
				preserving the land and nurturing relationships, offering
				farm-fresh goods that reflect the purity and richness of Idukki
				- The Spice garden of Kerala. Each item on our shelves embodies
				the care and craftsmanship of our dedicated farmers,
				transforming everyday meals into a tribute to the land. At The
				Farmer's Haven, we’re not just selling food—we’re fostering a
				movement towards a healthier, more connected world.
			</div>
			<div class="image-container">
				<img
					src="https://images.unsplash.com/photo-1591801058986-9e28e68670f7?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
				/>
			</div>
		</div>
		<div class="container2">
			<div class="text-container">
				<h3>Why choose The Farmer's Haven?</h3>
				Choose The Farmer's Haven for an authentic farm-to-table
				experience that champions quality and sustainability. Our
				commitment to partnering with local farmers ensures you receive
				the freshest, most flavorful produce while supporting ethical
				farming practices. With every purchase, you’re investing in a
				healthier lifestyle and a stronger community. Our products are
				more than just food—they’re a testament to the care,
				craftsmanship, and passion of those who grow them. By choosing
				us, you’re not only enjoying superior quality but also
				contributing to a movement that values integrity and connection
				in every bite.
			</div>
			<div class="image-container">
				<img
					src="https://images.unsplash.com/photo-1591801058986-9e28e68670f7?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
				/>
			</div>
		</div>
		<div class="testimonials">
			<h2>Our customers testimonials</h2>
			<el-carousel
				:interval="4000"
				:type="carouselType"
			>
				<el-carousel-item
					v-for="item in testimonials"
					:key="item.id"
				>
					<el-card
						shadow="hover"
						justify="center"
					>
						<div class="profile">
							<img
								src="../assets/images/male-profile-icon.png"
								alt=""
							/>
						</div>
						<div class="name">
							<span>{{ item.name }}</span>
							<i class="ri-instagram-fill"></i>
						</div>
						<div class="rating">
							<el-rate
								v-model="item.rating"
								disabled
								size="large"
							/>
						</div>
						<el-divider />
						<div class="review">
							<p>
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Harum neque tempore pariatur
								molestiae quod impedit perspiciatis assumenda,
								laudantium esse enim. Enim repellat, velit
								aspernatur illo ad ipsam perspiciatis et quam!
							</p>
						</div>
					</el-card>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	middleware: 'default',
});
const testimonials = ref([
	{
		id: 1,
		name: 'Kendrik Lamar',
		rating: 5,
	},
	{
		id: 2,
		name: 'J Cole',
		rating: 5,
	},
	{
		id: 3,
		name: 'Tupac',
		rating: 4,
	},
	{
		id: 4,
		name: 'Eminem',
		rating: 4,
	},
]);
const carouselType = ref('card');

const checkScreenSize = () => {
	if (window.innerWidth <= 768) {
		// Change 768 to your desired breakpoint
		carouselType.value = ''; // Change to vertical for smaller screens
	} else {
		carouselType.value = 'card'; // Default to card for larger screens
	}
};

onMounted(() => {
	checkScreenSize();
	window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', checkScreenSize);
});
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	h1 {
		margin-top: 10px;
	}
	.container {
		background-color: #fffbf0;
		display: flex;
		flex-direction: row;
		padding: 1rem 12rem;
		.text-container {
			width: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			h3 {
				margin: 1rem 0;
			}
			font-size: 1.5em;
			line-height: 1.5;
		}
		.image-container {
			top: 10px;
			width: 30%;
			margin-top: 1rem;
			img {
				padding: 1rem;
				inline-size: 100%;
				block-size: auto;
				object-fit: cover;
			}
		}
	}
	.container2 {
		display: flex;
		flex-direction: row;
		padding: 1rem 12rem;
		.text-container {
			width: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			h3 {
				margin: 1rem 0;
			}
			font-size: 1.5em;
			line-height: 1.5;
		}
		.image-container {
			width: 30%; // Adjust width for mobile
			margin-top: 6rem; // Add margin for spacing
			img {
				padding: 1rem;
				inline-size: 100%;
				block-size: auto; // Adjust block-size for mobile
				object-fit: cover;
			}
		}
	}
	// Media query for screens smaller than 768px (typical mobile devices)
	@media screen and (max-width: 768px) {
		.container,
		.container2 {
			padding: 1rem;
			flex-direction: column;
			.text-container {
				width: 100%;
			}
			.image-container {
				width: 100%; // Adjust width for smaller screens
			}
		}
	}
	.testimonials {
		text-align: center;
		padding: 10rem 5rem;
		width: 100%;
		h2 {
			margin-bottom: 2rem;
		}
		.el-carousel-item {
			max-width: 800px;
			margin: 0 auto;
		}
		.el-card {
			width: 50%;
			height: 100%;
			margin: 0 auto;
		}
		.profile {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			img {
				border-radius: 50%;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.name {
			padding-top: 3rem;
			width: 80%;
			display: flex;
			justify-content: space-between;
			span {
				font-weight: 700;
				font-size: 3rem;
			}
			i {
				font-size: 3rem;
			}
		}
	}
}
</style>
