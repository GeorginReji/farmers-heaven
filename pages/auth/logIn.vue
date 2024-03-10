<template>
  <div class="auth-page">
    <div class="heading">
      <h1 class="title">
        Welcome to The Farmers Heaven
      </h1>
      <h6 class="sub-title">
        Please sign in to continue...
      </h6>
    </div>

    <div class="ar-form">
      <el-form ref="loginForm" :model="model" label-position="top">
        <el-form-item prop="email">
          <el-input v-model="model.email" class="bg-grey" type="email" placeholder="Email Address" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="model.password" class="bg-grey" type="password" placeholder="Password" />
          <nuxt-link to="/auth/reset-password" class="ar-link">
            Forgot Password ?
          </nuxt-link>
        </el-form-item>
        <el-form-item>
          <el-button class="full-width" type="primary" ">
            SIGN IN
          </el-button>
        </el-form-item>
      </el-form>

      <template v-if="false">
        <el-divider>OR</el-divider>

        <el-button type="default" class="auth-button full-width">
          <span class="img-label">
            <span>Continue with Azure</span>
          </span>
        </el-button>
      </template>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'auth-layout'
})

const model = ref({
  email: null,
  password: null,
})
const rules = {
  email: [
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
    { required: true, message: 'Please enter email address', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
  ],
}
</script>

<style lang="scss" scoped>
.auth-page {
  .heading {
    .title {
      font-size: 22px;
    }
    .sub-title {
      padding: 10px 0px 10px 0px;
      font-size: 14px;
    }
  }
}
</style>
