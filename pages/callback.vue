<template>
	<div
		v-loading.fullscreen.lock="isLoading"
		style="width: 100%; height: 100vh"
	></div>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();
const { isLoading } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

console.log('loading state', isLoading.value);

onMounted(async () => {
	if (await authStore.authUser(route.query.code)) {
		await router.push('/');
		// console.log('auth user', authStore.userDetails);
	} else {
		router.push('/AuthLogin');
	}
});
</script>

<style lang="scss"></style>
