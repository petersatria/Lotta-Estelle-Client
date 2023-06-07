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
  },
})