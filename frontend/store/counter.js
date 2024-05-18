import { defineStore } from 'pinia';

export const useCounter = defineStore('counter', {
  // State (using a reactive ref for type safety and reactivity)
  state: () => ({
    count: ref(0),
  }),

  // Getters (using computed property for efficiency)
  getters: {
    getCount: (state) => state.count,
  },

  // Actions (using a mutation function to update state immutably)
  actions: {
    increment() {
      this.count++; // Using `this` to access reactive state
    },
  },
});
