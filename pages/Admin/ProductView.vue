<template>
	<el-container>
		<el-row :gutter="20">
			<el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
			<el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
			<el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
			<el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
		</el-row>
	</el-container>
</template>

<script setup>
definePageMeta({
	middleware: 'default',
	layout: 'admin-layout',
});
</script>

<style lang="scss"></style>
