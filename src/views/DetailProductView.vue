<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'
import { toast } from '../helpers/helper'
export default {
  data() {
    return {
      size: []
    }
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProductById']),
    addToCartHandler() {
      const data = {
        id: this.product.id,
        name: this.product.name,
        size: this.size,
        qty: 1,
        price: this.product.price,
        imgUrl: this.product.imgUrl,
        subtotal: this.product.price
      }
      if (!localStorage.access_token) {
        toast('error', 'You need to login first')
      } else {
        if (!data.size[0]) {
          return toast('error', 'Please select size first')
        }
        let carts = JSON.parse(localStorage.getItem('carts'))
        if (!carts) {
          carts = []
          localStorage.setItem('carts', JSON.stringify(carts))
        }

        if (carts.find((e) => e.id === data.id && e.size[0] === data.size[0])) {
          carts.find((e) => {
            if (e.id === data.id && e.size[0] === data.size[0]) {
              e.qty += data.qty
              e.subtotal += data.price
            }
          })
        } else {
          carts.push(data)
        }
        localStorage.setItem('carts', JSON.stringify(carts))
        toast('success', 'Success add product')
      }
    },
    selectHandler(e) {
      this.size = e.target.value.split(',')
    }
  },
  computed: {
    ...mapState(useProductStore, ['product']),
    rupiah() {
      return this.product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }
  },
  created() {
    this.fetchProductById(this.$route.params.id)
  }
}
</script>

<template>
  <section class="container">
    <div class="row text-center my-5">
      <div class="col-12 col-md-6 align-self-center">
        <img class="img-fluid" :src="product.imgUrl" alt="" />
      </div>
      <div class="col-12 col-md-6 my-5 align-self-center">
        <h1>{{ product.name }}</h1>
        <p class="mt-5 mt-md-3 mt-lg-5"></p>
        <p class="mt-5 mt-md-3 mt-lg-5">{{ rupiah }}</p>
        <div class="row justify-content-center">
          <div class="col-4 mt-5 mt-md-3 mt-lg-5">
            <div class="dropdown">
              <select
                class="btn dropdown-toggle w-100 h-100"
                style="font-size: 14px; padding: 10px; border: 1px solid"
                @change="selectHandler"
              >
                <option class="dropdown-item" value="" selected disabled>Select Size</option>
                <option
                  class="dropdown-item"
                  :value="[size.id, size.size]"
                  v-for="size in product.SizeProducts"
                  :key="size.id"
                >
                  {{ size.size }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-4 mt-5 mt-md-3 mt-lg-5">
            <div
              @click="addToCartHandler"
              class="btn btn-dark w-100 h-100"
              style="font-size: 14px; padding: 10px"
            >
              Add to cart
            </div>
          </div>
        </div>
        <div class="mt-5 mt-md-3 mt-lg-5 align-items-end border-custom">
          <p class="my-5 my-md-3 my-lg-5 category-font">Category: {{ product.categoryName }}</p>
        </div>
      </div>
      <div class="row text-center my-md-5">
        <div class="mt-md-5 border-custom">
          <h2 class="mt-5">{{ product.title }}</h2>
          <p class="my-5 product-desc">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 32px;
  font-weight: 200;
  color: #1e1e23;
}
h2 {
  color: #1e1e23;
  font-weight: 400;
  font-size: 24px;
}
.border-custom {
  border-top: 1px solid #eaebee;
  border-bottom: 1px solid #eaebee;
}

.category-font {
  font-size: 12px;
  font-weight: 700;
  color: #7c7c80;
  text-transform: uppercase;
}
.product-desc {
  font-size: 14px;
  font-weight: 400;
  color: #7c7c80;
}

img {
  min-height: 50vh;
  max-height: 80vh;
  height: auto;
}
</style>
