import { defineStore } from 'pinia'
import axios from 'axios'
import { errorHandler, toast } from '../helpers/helper'

export const useProductStore = defineStore('product', {
  state: () => ({
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://lotta-estelle-server.petersox.online',
    products: [],
    sizeProducts: [],
    product: {},
    histories: []

  }),
  getters: {

  },
  actions: {
    async fetchSizeProducts() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/admin/products/size',
          headers: { access_token: localStorage.access_token }
        })
        this.sizeProducts = data.data
      } catch (err) {
        errorHandler(err)
      }
    },
    async createSizeProduct(data) {
      try {
        await axios({
          url: this.baseUrl + '/admin/products/size',
          method: 'POST',
          headers: { access_token: localStorage.access_token },
          data
        })
        toast('success', 'Success add size ' + data.size)
        this.fetchProducts()
        this.fetchSizeProducts()
      } catch (err) {
        errorHandler(err)
      }
    },
    async deleteSizeProduct(id) {
      try {
        await axios({
          url: this.baseUrl + '/admin/products/size/' + id,
          method: 'DELETE',
          headers: { access_token: localStorage.access_token }
        })
        toast('success', 'Success delete size')
        this.fetchProducts()
        this.fetchSizeProducts()

      } catch (err) {
        errorHandler(err)
      }
    },
    async fetchProducts(size, page, filter) {
      try {
        const { data } = await axios({ url: this.baseUrl + '/api/products' })
        this.products = data.data
      } catch (err) {
        errorHandler(err)
      }
    },
    async fetchProductById(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + `/api/products/${id}`
        })
        this.product = data.data
      } catch (err) {
        errorHandler(err)
      }
    },
    async createProduct(payload) {
      try {
        await axios({
          url: this.baseUrl + `/admin/products`,
          method: 'POST',
          headers: { access_token: localStorage.access_token },
          data: payload
        })
        this.router.push('/admin')
        this.fetchProducts()
      } catch (err) {
        errorHandler(err)
      }
    },
    async updateProduct(payload, id) {
      try {
        await axios({
          url: this.baseUrl + `/admin/products/${id}`,
          method: 'PUT',
          headers: { access_token: localStorage.access_token },
          data: payload
        })
        this.router.push('/admin')
        this.fetchProducts()
      } catch (err) {
        errorHandler(err)
      }
    },
    async paid() {
      try {
        await axios({
          method: 'PATCH',
          url: this.baseUrl + `/api/transactions${id}`,
          headers: { access_token: localStorage.access_token },
        })
        localStorage.carts = []
      } catch (err) {
        errorHandler(err)
      }
    },
    async checkout() {
      try {
        let carts = JSON.parse(localStorage.carts)
        carts.forEach(e => e.size = e.size[0])
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + `/api/transactions`,
          headers: { access_token: localStorage.access_token },
          data: { carts }
        })

        let router = this.router
        window.snap.pay(data.midtransToken.token, {
          onSuccess: async function (result) {
            /* You may add your own implementation here */
            // cb()
            await axios({
              method: 'PATCH',
              url: `https://lotta-estelle-server.petersox.online/api/transactions/${data.transaction.id}`,
              headers: { access_token: localStorage.access_token },
            })
            localStorage.removeItem('carts')
            toast('success', 'payment success')
            router.push('/')
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            toast('info', 'wating your payment')
          },
          onError: function (result) {
            /* You may add your own implementation here */
            toast('error', 'payment failed')
          },
          onClose: function () {
            /* You may add your own implementation here */
            toast('warning', 'you closed the popup without finishing the payment')
          },
        })
      } catch (err) {
        errorHandler(err)
      }
    },
    async fetchTransaction() {
      try {
        const { data } = await axios({
          url: this.baseUrl + `/api/transactions`,
          headers: { access_token: localStorage.access_token }
        })
        this.histories = data.data
      } catch (err) {
        errorHandler(err)
      }
    }
  },
})