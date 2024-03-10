<template>
    <div class="layout">
        <div class="navbar-section">
                <topbar />
                <div class="logo">
                    <img src="../assets/images/TFH_logo.png" alt="">
                </div>
                <navbar />
        </div>
        <slot />
        <navFooter />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.layout {
    height: 100vh;
    display: flex;
    gap: 20px;
    flex-direction: column;
    .navbar-section {
        height: auto;
        .logo {
        // background-image: url(../assets/images/doodle3.jpg);
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: center;
    }
    }
    .hero-section {
        width: 100%;
        height: calc(82vh - 20px);
    }
}

</style>