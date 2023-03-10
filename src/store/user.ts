import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),
  getters: {
    getUser: (state) => state.user
  }
})
