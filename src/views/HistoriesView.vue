<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'

export default {
  methods: {
    ...mapActions(useProductStore, ['fetchTransaction']),
    nameProduct(productName) {
      let name = productName.split(' ')
      name.forEach((e, i) => {
        name[i] = name[i][0].toUpperCase() + name[i].substr(1)
      })
      name = name.join(' ')
      return name
    },
    rupiah(price) {
      return price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }
  },
  computed: {
    ...mapState(useProductStore, ['histories'])
  },
  created() {
    this.fetchTransaction()
  }
}
</script>

<template>
  <section class="container">
    <div class="my-5 wrapper-histories p-5" v-if="histories?.length > 0">
      <h3 class="text-center">Transaction List</h3>
      <div class="m-5 wrapper-card" v-for="(history, index) in histories" :key="index">
        <div class="card-body">
          <div
            class="row p-0 m-0"
            v-for="(product, index) in history.TransactionProducts"
            :key="index"
          >
            <div class="col-md-4 p-0">
              <img class="img-fluid" alt="..." :src="product.Product.imgUrl" />
            </div>
            <div class="col-md-4 align-self-center">
              <div class="">
                <p class="subheading">{{ nameProduct(product.Product.name) }}</p>
              </div>
            </div>
            <div class="col-md-1 align-self-center ps-0">
              <p class="text-end price">X {{ product.qty }}</p>
            </div>
            <div class="col-md-3 align-self-center ps-0 pe-4">
              <p class="text-end price">{{ rupiah(product.Product.price) }}</p>
            </div>
          </div>
          <div class="border-custom"></div>
          <div class="row py-2 m-0">
            <div class="col-md-4"></div>
            <div class="col-md-5 align-self-center">
              <div class=""><p class="m-0 subheading">Total Price</p></div>
            </div>
            <div class="col-md-3 align-self-center ps-0 pe-4">
              <p class="text-end m-0 price">{{ rupiah(history.totalPrice) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex flex-column justify-content-center align-items-center">
      <h1 class="text-center my-5">My Transaction Histories</h1>
      <img src="../assets/undraw_empty_cart.svg" alt="" class="img-fluid w-50" />
      <h3 class="my-5">Your transaction histories is empty, get your favourite products first</h3>
    </div>
  </section>
</template>

<style scoped>
.wrapper-histories {
  border: 1px solid #eaebee;
}

.wrapper-card {
  border: 1px solid #eaebee;
  box-shadow: 0 1px 6px 0 var(--color-shadow, rgba(49, 53, 59, 0.12));
}

.border-custom {
  border-top: 1px solid #eaebee;
}

.price {
  font-size: 24px;
  font-weight: 500;
  color: #1e1e23;
}

.subheading {
  font-size: 24px;
  font-weight: 200;
  color: #1e1e23;
}
</style>
