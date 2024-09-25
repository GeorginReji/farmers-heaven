<template>
	<div
		v-loading.fullscreen.lock="isLoading"
		style="width: 100%; height: 100vh"
	></div>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const { isLoading } = storeToRefs(authStore);
console.log('loading state', isLoading.value);

const init = async () => {
	if (await authStore.autUser(route.query.code)) {
		router.push('/');
	} else {
		router.push('/AuthLogin');
	}
};

init();
</script>

<style lang="scss"></style>
