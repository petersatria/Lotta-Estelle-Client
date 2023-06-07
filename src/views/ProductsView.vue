<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'
import CardProduct from '../components/CardProduct.vue'
export default {
  components: {
    CardProduct
  },
  computed: {
    ...mapState(useProductStore, ['products'])
  },
  methods: {
    ...mapActions(useProductStore, ['fetchProducts'])
  },
  created() {
    this.fetchProducts()
  }
}
</script>

<template>
  <section class="container">
    <div class="row g-5">
      <h1 class="text-center">Products</h1>
      <div class="col-6 col-md-3" v-for="product in products" :key="product.id">
        <CardProduct :product="product" />
      </div>
      <!-- <div class="col-6 col-md-3">
        <Card />
      </div>
      <div class="col-6 col-md-3">
        <Card />
      </div>
      <div class="col-6 col-md-3">
        <Card />
      </div> -->
    </div>
  </section>
</template>
