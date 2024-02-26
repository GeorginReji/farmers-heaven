<template>
    <div class="navbar">
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
  >
  <!-- <el-sub-menu index="2">
      <template #title>Our Products</template>
      <el-menu-item index="2-1">Gift Hampers</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu> -->
    <el-menu-item index="1">Our Products</el-menu-item>
    <el-menu-item index="2">About</el-menu-item>
    <el-menu-item index="3" >Gift Hampers</el-menu-item>
    <el-menu-item index="4">Gallery</el-menu-item>
    <el-menu-item index="5">Blog</el-menu-item>
    <el-menu-item index="6">Know Your Farmer</el-menu-item>
  </el-menu>
        <!-- <i>Our Products</i>
        <i>About</i>
        <i>Gift Hamper</i>
        <i>Gallery</i>
        <i>Blog</i>
        <i>Know your Farmer</i> -->
    </div>
</template>

<script setup>

</script>

<style lang="scss">
    .navbar {
        font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
    }
</style>