<template>
    <div class="topbar">
        <div class="menu-items">
            <div class="menu-icon-container" @click="drawer = true">
                <i class="ri-menu-line"></i>
            </div>
            <el-drawer v-model="drawer" size="30%" title="I am the title" :with-header="false">
                <div class="logo">
                    <img src="../assets/images/TFH_logo.png" alt="">
                </div>
                <el-menu>
                    <el-menu-item index="1">
                        <span>Our Products</span>
                    </el-menu-item>
                    <el-menu-item index="2">
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
                    <el-menu-item index="6" disabled>
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
        <div class="login-icons">
            <div class="sign-in">
                    <nuxt-link to="/AuthLogin" class="ar-link">
                        <i class="ri-user-fill"></i>Login/Sign-Up
                    </nuxt-link>
            </div>
            <div class="cart-icon">
                    <i class="ri-heart-fill"></i>My Wish-list
            </div>
        </div>
    </div>
</template>

<script setup>
const drawer = ref(false)
</script>

<style lang="scss">
.topbar {
    display: flex;
    justify-content: space-between;
    font-size: 2.5rem;
    background-color: #663b2f;

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

    .social-media {
        display: flex;
        padding: 5px;
        gap: 10px;
        color: #D9CFCC;

        i:hover {
            cursor: pointer;
        }
    }

    .login-icons {
        display: flex;
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
            color: #67C23A;
            border-color: #85ce61;
            outline: 0;
        }
    }

    @media screen and (max-width: 600px) {
        .social-media {
            display: none;
        }

        .menu-items {
            display: block;
        }
    }

}
</style>