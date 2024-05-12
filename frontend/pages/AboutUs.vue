<template>
    <div class="main">
        <h1>About Us</h1>
        <div class="container">
            <div class="text-container">
                <h3>Sub Heading 1</h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quos architecto eos qui culpa, nesciunt, accusamus placeat nobis sapiente labore doloremque sed facere vel consequatur quae minus. Vel veniam totam amet quis aut, atque voluptatibus nam sequi laborum cupiditate. Non, facere eaque. Porro quasi iste voluptatibus officiis placeat dignissimos excepturi consectetur aliquam? Magnam voluptatum officia dolore ducimus dicta quos dignissimos quaerat ad, vitae illo? Laudantium quo sed beatae minima et animi ipsum dicta vitae. Voluptatum fugit minus iste similique architecto saepe repellat delectus maxime accusamus, ullam nulla odio laborum nihil, expedita ab autem fugiat dignissimos! Rerum ipsa a quos mollitia.
            </div>
            <div class="image-container">
                <img src="https://images.unsplash.com/photo-1591801058986-9e28e68670f7?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            </div>
        </div>
        <div class="container2">
            <div class="image-container">
                <img src="https://images.unsplash.com/photo-1591801058986-9e28e68670f7?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            </div>
            <div class="text-container">
                <h3>Sub Heading 2</h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quos architecto eos qui culpa, nesciunt, accusamus placeat nobis sapiente labore doloremque sed facere vel consequatur quae minus. Vel veniam totam amet quis aut, atque voluptatibus nam sequi laborum cupiditate. Non, facere eaque. Porro quasi iste voluptatibus officiis placeat dignissimos excepturi consectetur aliquam? Magnam voluptatum officia dolore ducimus dicta quos dignissimos quaerat ad, vitae illo? Laudantium quo sed beatae minima et animi ipsum dicta vitae. Voluptatum fugit minus iste similique architecto saepe repellat delectus maxime accusamus, ullam nulla odio laborum nihil, expedita ab autem fugiat dignissimos! Rerum ipsa a quos mollitia.
            </div>
        </div>
        <div class="container">
            <div class="text-container">
                <h3>Sub Heading 3</h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quos architecto eos qui culpa, nesciunt, accusamus placeat nobis sapiente labore doloremque sed facere vel consequatur quae minus. Vel veniam totam amet quis aut, atque voluptatibus nam sequi laborum cupiditate. Non, facere eaque. Porro quasi iste voluptatibus officiis placeat dignissimos excepturi consectetur aliquam? Magnam voluptatum officia dolore ducimus dicta quos dignissimos quaerat ad, vitae illo? Laudantium quo sed beatae minima et animi ipsum dicta vitae. Voluptatum fugit minus iste similique architecto saepe repellat delectus maxime accusamus, ullam nulla odio laborum nihil, expedita ab autem fugiat dignissimos! Rerum ipsa a quos mollitia.
            </div>
            <div class="image-container">
                <img src="https://images.unsplash.com/photo-1591801058986-9e28e68670f7?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            </div>
        </div>
            <div class="testimonials">
                <h2>Our customers testimonials</h2>
        <el-carousel :interval="4000" :type="carouselType" > 
            <el-carousel-item v-for="item in testimonials" :key="item.id">
                <el-card shadow="hover" justify="center">
                <div class="profile">
                    <img src="../assets/images/male-profile-icon.png" alt="">
                </div>
                <div class="name">
                    <span>{{ item.name }}</span>
                    <i class="ri-instagram-fill"></i>
                </div>
                <div class="rating">
                    <el-rate v-model="item.rating" disabled size="large" />
                </div>
                <el-divider />
                <div class="review">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum neque tempore pariatur molestiae quod impedit perspiciatis assumenda, laudantium esse enim. Enim repellat, velit aspernatur illo ad ipsam perspiciatis et quam!</p>
                </div>
                </el-card>
            </el-carousel-item>
        </el-carousel>
    </div>
    </div>
</template>

<script setup>
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
    }
])
 const carouselType = ref('card');

    const checkScreenSize = () => {
      if (window.innerWidth <= 768) { // Change 768 to your desired breakpoint
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

    h1 {
        margin-top: 10px;
    }

    .container {
        background-color: #FFFBF0;
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
        .container, .container2 {
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