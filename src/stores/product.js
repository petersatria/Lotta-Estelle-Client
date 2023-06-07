import { defineStore } from 'pinia'
import axios from 'axios'
import { errorHandler, toast } from '../helpers/helper'

export const useProductStore = defineStore('product', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    products: [],
    product: {}

  }),
  getters: {

  },
  actions: {
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
        console.log(data.data);
      } catch (err) {
        errorHandler(err)
      }
    },
    async paid() {
      try {
        await axios({
          method: 'PATCH',
          url: this.baseUrl + `/api//transactions${id}`,
          headers: { access_token: localStorage.access_token },
        })
        localStorage.carts = []
      } catch (err) {
        console.log(err);
        errorHandler(err)
      }
    },
    async checkout() {
      try {
        let carts = JSON.parse(localStorage.carts)
        carts.forEach(e => e.size = e.size[0])
        // console.log('mecoba checkot', carts);
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + `/api/transactions`,
          headers: { access_token: localStorage.access_token },
          data: { carts }
        })
        console.log(data);
        // this.product = data.data
        // console.log(data.data);
        // const cb = this.paid

        window.snap.pay(data.midtransToken.token, {
          onSuccess: async function (result) {
            /* You may add your own implementation here */
            // cb()
            await axios({
              method: 'PATCH',
              url: `http://localhost:3000/api/transactions/${data.transaction.id}`,
              headers: { access_token: localStorage.access_token },
            })
            localStorage.removeItem('carts')
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
          }
        })
      } catch (err) {
        console.log(err);
        errorHandler(err)
      }
    },
  },
})