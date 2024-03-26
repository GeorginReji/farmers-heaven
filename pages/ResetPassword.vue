<template>
    <div class="auth-layout">
        <div class="heading">
            <h1 class="title">
                Password Reset
            </h1>
        </div>
        <el-form ref="resetForm" :rules="resetFormRules" :model="resetModel" label-position="top">
            <el-form-item label="Email" prop="email">
                <el-input v-model="resetModel.email" class="bg-grey" type="email" placeholder="Email Address" />
            </el-form-item>
            <el-form-item label="password" prop="password">
                <el-input v-model="resetModel.password" class="bg-grey" type="password" placeholder="Password" />
            </el-form-item>
            <el-form-item label="confirmPassword" prop="confirmPassword">
                <el-input v-model="resetModel.confirmPassword" class="bg-grey" type="password"
                    placeholder="Confirm Password" />
            </el-form-item>
            <el-form-item>
                <el-button :style="{ width: '100%' }" type="primary" >
                    Update Password
            </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'auth-layout'
})
const resetModel = reactive({
    email: '',
    password: '',
    confirmPassword: ''
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (resetModel.password !== '') {
            if (!resetModel.value) return
            resetModel.value.validateField('password', () => null)
        }
        callback()
    }
}

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== resetModel.password) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}
const resetFormRules = reactive({
    email: [{ required: true, type: 'email', message: 'Please input correct email address', }],
    password: [{ validator: validatePass, trigger: 'blur' }],
    confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
})
</script>

<style lang="scss" scoped>
.auth-layout {
    .el-form {
        .el-form-item {
            .el-input {
                width: 300px;
            }
        }
    }
}
</style>