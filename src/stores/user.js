import { defineStore } from 'pinia'
import axios from 'axios'
import { errorHandler, toast } from '../helpers/helper'

export const useUserStore = defineStore('user', {
  state: () => ({
    baseUrl: 'http://localhost:3000/api',
    access_token: localStorage.access_token,
    role: localStorage.role
  }),
  getters: {

  },
  actions: {
    async handleRegister(userData) {
      try {
        console.log(userData);
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/register',
          data: userData
        })
        this.router.push('/login')
        toast('success', data.message)
      } catch (err) {
        errorHandler(err)
      }
    },
    async handleLogin(userData) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/login',
          data: userData
        })
        this.access_token = data.access_token
        localStorage.access_token = data.access_token
        this.role = data.role
        localStorage.role = data.role
        this.router.push('/')
        toast('success', data.message)
      } catch (err) {
        errorHandler(err)
      }
    },
    handleLogout() {
      localStorage.clear()
      this.access_token = null
      this.router.push('/login')
      toast('success', 'Success to logout')
    }
  },
})