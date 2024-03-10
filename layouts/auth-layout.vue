<template>
    <el-container class="auth-container">
      <div class="auth-content">
        <slot />
      </div>
      <div class="art-content">
        <img src="../assets/images/TFH_logo.png" alt="tgh-logo">
      </div>
    </el-container>
  </template>
  
  <script>
  export default {
    name: 'AuthLayout'
  }
  </script>
  
  <style lang="scss">
  .auth-container{
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: #E9EAED;
  
    display: flex;
    align-items: center;
    justify-content: space-between;
  
    .auth-content{
      flex: 1;
      padding: 5rem 10rem;
      background-color: #FFFFFF;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
    .art-content{
      flex: 2;
      padding: 5rem 10rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      img{
          height: auto;
          width: 50%;
          margin: 0 auto;
      }
    }
  }
  </style>
  