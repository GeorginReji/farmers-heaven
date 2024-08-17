<template>
	<div class="auth-page">
		<div class="heading">
			<h1 class="title">Welcome to The Farmers Heaven</h1>
			<h6 class="sub-title">Please sign in to continue...</h6>
		</div>

		<div class="login-form">
			<el-button
				@click="handleSignup"
				:style="{ width: '100%' }"
				type="primary"
			>
				Login or Sign up with
				<i
					:style="{ padding: '10px' }"
					class="ri-google-fill"
				/>
			</el-button>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';
const { authStart } = useAuthStore();
definePageMeta({
	layout: 'auth-layout',
});
const activeName = ref('first');

const handleSignup = async (e) => {
	await authStart();
};
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
