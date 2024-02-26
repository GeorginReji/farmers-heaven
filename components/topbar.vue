<template>
    <div class="topbar">
        <div class="social-media">
            <i class="ri-facebook-fill"></i>
            <i class="ri-twitter-x-line"></i>
            <i class="ri-instagram-line"></i>
            <i class="ri-whatsapp-line"></i>
        </div>
        <div class="login-icons">
            <div class="sign-in">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Login or create new account"
                    placement="bottom-end"
                >
                    <el-button><i class="ri-user-fill"></i>Login/Sign-Up</el-button>
                    </el-tooltip>
            </div>
            <div class="cart-icon">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="View saved products"
                    placement="bottom-end"
                >
                    <el-button><i class="ri-heart-fill"></i>My Wish-list</el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss">
    .topbar {
        display: flex;
        justify-content: space-between;
        font-size: 2.5rem;
        background-color: #663b2f;
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
         }
        .cart-icon {
            display: flex;
            gap: 5px;
        }
        .el-button {
            span{
                display: flex;
                gap: 10px;
            }
        }
        .el-button:focus, .el-button:hover {
            color: #67C23A;
            border-color: #85ce61;
            outline: 0;
        }
    }
    }
</style>