<template>
    <div class="layout">
        <div class="navbar-section">
            <topbar />
            <navbar />
        </div>
        <slot />
        <div class="whats-app-container">
            <a href="https://wa.me/8281560102">
                <i class="ri-whatsapp-line"></i>
            </a>
        </div>
        <navFooter />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    flex-direction: column;
    .hero-section {
        width: 100%;
        height: calc(82vh - 20px);
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