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

    <div class="login-form">
      <el-tabs v-model="activeName" type="card" class="demo-tabs">
        <el-tab-pane label="Login" name="first">
          <el-form ref="loginForm" :model="loginModel" :style="{ width: '350px' }" label-position="top">
            <el-form-item label="Email" prop="email">
              <el-input v-model="loginModel.email" class="bg-grey" type="email" placeholder="Email Address" />
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input v-model="loginModel.password" class="bg-grey" type="password" placeholder="Password" />
              <nuxt-link to="/ResetPassword" class="ar-link">
                Forgot Password ?
              </nuxt-link>
            </el-form-item>
            <el-form-item>
              <el-button :style="{ width: '100%' }" type="primary" >
            Log In
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label=" Sign-Up" name="second">
      <el-form :rules="signUpRules" label="Create an account" ref="signUpForm" :style="{ width: '350px' }" :model="signupModel" label-position="top">
        <el-form-item label="Email" prop="email">
          <el-input v-model="signupModel.email" class="bg-grey" type="email" placeholder="Email Address" />
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-input v-model="signupModel.phone" class="bg-grey" type="phone" placeholder="Phone Number">
            <template #prepend>+91</template>
          </el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="signupModel.password" class="bg-grey" type="password" placeholder="Password" />
        </el-form-item>
        <el-form-item label="confirm password" prop="confirmPassword">
          <el-input v-model="signupModel.confirmPassword" class="bg-grey" type="password" placeholder="confirm Password" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSignup(signUpForm)" :style="{ width: '100%' }" type="primary" >
          Sign Up
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

  </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

definePageMeta({
  layout: 'auth-layout'
})

const activeName = ref('first')
const signupModel = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})
const signUpForm = ref(null)

const loginModel = reactive({
  email: '',
  password: ''
})

const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('Please input the phone number'));
  }

  if (!/^[0-9]+$/.test(value)) {
    return callback(new Error('Please input digits only'));
  }

  if (value.length !== 10) {
    return callback(new Error('Enter a valid 10-digit phone number'));
  }
  callback();
}

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (signupModel.password !== '') {
      if (!signupModel.value) return
      signupModel.value.validateField('password', () => null)
    }
    callback()
  }
}

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== signupModel.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const signUpRules = reactive({
  email: [{required: true, type: 'email', message: 'Please input correct email address',}],
  password: [{ validator: validatePass, trigger: 'blur' }],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
  phone: [{ validator: checkPhone, trigger: 'blur' }],
})

const handleSignup = (SignUpForm) => {
  console.log(SignUpForm);
  if (!SignUpForm) return;
  SignUpForm.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
    }
  });
  // try {
  //   const res = await client.auth.signUp({
  //   email: signupModel.email,
  //   password: signupModel.password,
  //   phone: signupModel.phone
  // })
  // console.log('res', res);
  // } catch(error) {
  //   console.log(error);
  // }
}
</script>

<style lang="scss" scoped>
.auth-page {
  .login-form {
    .el-form {
      padding: 10px;
      border: 1px solid #C0C4CC;
    }
  }

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
