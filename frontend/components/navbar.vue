<template>
  <div class="navbar">
    <el-menu
      mode="horizontal"
      :popper-offset="16"
      style="width: 600px"
      ellipsis
    >
      <el-menu-item index="1">Our Products</el-menu-item>
      <el-menu-item index="2">About</el-menu-item>
      <el-menu-item index="3" >Gift Hampers</el-menu-item>
      <el-menu-item index="4">Gallery</el-menu-item>
      <el-menu-item index="5">Blog</el-menu-item>
      <el-menu-item index="6">Know Your Farmer</el-menu-item>
    </el-menu>
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

  @media screen and (max-width: 600px) {
    .navbar {
      display: none;
    }
  }
</style>
