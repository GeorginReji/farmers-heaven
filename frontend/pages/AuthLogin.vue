<template>
	<div class="auth-page">
		<div class="heading">
			<h1 class="title">Welcome to The Farmers Heaven</h1>
			<h6 class="sub-title">Please sign in to continue...</h6>
		</div>

		<div class="login-form">
			<el-tabs
				v-model="activeName"
				type="card"
				class="demo-tabs"
			>
				<el-tab-pane
					label="Login"
					name="first"
				>
					<el-button
						@click="handleSignup"
						:style="{ width: '100%' }"
						type="primary"
					>
						Login With<i
							:style="{ padding: '10px' }"
							class="ri-google-fill"
						/>
					</el-button>
				</el-tab-pane>
				<el-tab-pane
					label=" Sign-Up"
					name="second"
				>
					<el-button
						@click="handleSignup"
						:style="{ width: '100%' }"
						type="primary"
					>
						Sign-Up<i
							:style="{ padding: '10px' }"
							class="ri-google-fill"
						/>
					</el-button>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '~/store/auth'
const { authenticateUser } = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore())
definePageMeta({
	layout: 'auth-layout',
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
	username: 'emilys',
	password: 'emilyspass',
})

const router = useRouter()

const handleLogin = async () => {
	await authenticateUser(loginModel) // call authenticateUser and pass the user object
	// redirect to homepage if user is authenticated
	if (authenticated) {
		router.push('/')
	}
}

const checkPhone = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('Please input the phone number'))
	}

	if (!/^[0-9]+$/.test(value)) {
		return callback(new Error('Please input digits only'))
	}

	if (value.length !== 10) {
		return callback(new Error('Enter a valid 10-digit phone number'))
	}
	callback()
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
	email: [
		{
			required: true,
			type: 'email',
			message: 'Please input correct email address',
		},
	],
	password: [{ validator: validatePass, trigger: 'blur' }],
	confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
	phone: [{ validator: checkPhone, trigger: 'blur' }],
})

const handleSignup = async (e) => {
	e.preventDefault()
	if (!signupModel) return
	// const form = signUpForm.value
	// await form.validate()
	// console.log("sign up form", form)
	// if (form.valid) {
	// 	console.log('Form submitted successfully!')
	// 	// Perform actual submission logic (e.g., API call) here
	// } else {
	// 	console.log('Error: Form validation failed.')
	// 	// Handle validation errors (e.g., display error messages)
	//};
	//
}
</script>

<style lang="scss" scoped>
.auth-page {
	.login-form {
		.el-form {
			padding: 10px;
			border: 1px solid #c0c4cc;
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
