import { defineStore } from 'pinia'

export const useMyIndexStore = defineStore({
	id: 'myIndexStore',
	state: () => ({
		loader: false,
	}),
	actions: {},
})
