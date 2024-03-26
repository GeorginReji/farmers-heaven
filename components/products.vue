<template>
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <img
          src="../assets/images/spice-1.jpg"
          class="image"
        />
        <div class="card-content">
          <span>Star anise</span>
          <p class="description">Lorem ipsum dolor, sit amet dicta, eligendi ipsam, deserunt dolorum necessitatibus officiis voluptate atque quaerat. </p>
          <div class="bottom">
            <el-button type="success" class="button">Add to cart <i class="ri-shopping-cart-line"></i></el-button>
          </div>
        </div>
      </el-card>
</template>

<script setup>

</script>

<style lang="scss">
.el-card__body {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
}
.card-content {
  padding: 14px;
  span {
    font-size: medium;
    font-weight: 600;
  }
  p {
    padding-bottom: 10px;
    font-size: small;
  }
  .button {
    i {
      padding-left: 5px;
    }
}
}
</style>