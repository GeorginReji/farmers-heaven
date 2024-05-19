<template>
  <el-card shadow="hover">
    <img src="../assets/images/spice-1.jpg" class="image">
    <div class="card-content">
      <div class="product-details">
        <div class="product-name">
          <NuxtLink to="/Product">
            <span>Star anise</span>
          </NuxtLink>
        </div>
        <p class="description">Lorem ipsum dolor, sit amet dicta, eligendi ipsam, deserunt dolorum necessitatibus
          officiis
          voluptate atque quaerat.
        </p>
      </div>
      <div class="btn-price">
        <span>₹250</span>
        <div class="bottom">
          <el-button type="success" class="button">Add to <i class="ri-shopping-cart-line"></i></el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>

</script>

<style lang="scss">
.el-card__body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #FFFBF0;
  &:hover {
    background-color: #fff1de;
  }
}
.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: medium;
    font-weight: 600;
  }
  p {
    padding-bottom: 10px;
    font-size: small;
  }
  .product-details {
    min-width: 63%;
    .product-name {
      padding: 1rem 0;
    }
  }
  .btn-price {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    span {
      font-weight: 400;
      font-size: 2rem;
    }
  }
}
.button {
  i {
    padding-left: 5px;
  }
}
</style>