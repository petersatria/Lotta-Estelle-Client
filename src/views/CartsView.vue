<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product'
import { toast } from '../helpers/helper'
export default {
  data() {
    return {
      carts: []
    }
  },
  methods: {
    ...mapActions(useProductStore, ['checkout']),
    checkoutHandler() {
      this.checkout()
    },
    deleteProductHandler(id, size) {
      let carts = JSON.parse(localStorage.getItem('carts'))
      const data = carts.filter((e) => e.id != id || e.size[0] !== size[0])
      this.carts = carts = data
      localStorage.carts = JSON.stringify(carts)
    },
    quantityHandler(id, size, price, type) {
      let carts = JSON.parse(localStorage.getItem('carts'))
      carts.find((e) => {
        if (e.id === id && e.size[0] === size[0] && type === 'decrement') {
          if (e.qty == 1) {
            toast('error', 'Minimum quantity is 1')
          } else {
            e.qty--
            e.subtotal -= price
          }
        } else if (e.id === id && e.size[0] === size[0] && type === 'increment') {
          e.qty++
          e.subtotal += price
        }
      })
      this.carts = carts
      localStorage.carts = JSON.stringify(carts)
    },
    rupiah(value) {
      return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }
  },
  created() {
    this.carts = JSON.parse(localStorage.getItem('carts'))
  }
}
</script>

<template>
  <section class="container">
    <h1 class="text-center my-5">My Carts</h1>
    <div
      class="d-flex flex-column justif-content-center align-items-center py-5"
      v-if="carts?.length > 0"
    >
      <table class="w-100">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-custom" v-for="(cart, index) in carts" :key="index">
            <td class="py-4 d-flex align-items-center flex-column flex-md-row">
              <img :src="cart.imgUrl" class="Cart_imageTable__UIT9I" width="100" /><span class="m-2"
                >{{ cart.name }} ( {{ cart.size[1] }} )</span
              >
            </td>
            <td>{{ rupiah(cart.price) }}</td>
            <td>
              <div class="d-flex align-items-center">
                <span style="color: silver">QTY:</span>
                <div class="box-qty">
                  <button
                    @click="quantityHandler(cart.id, cart.size, cart.price, 'increment')"
                    class="cart-qty-btn"
                  >
                    +</button
                  ><input class="cart-qty-input" :placeholder="cart.qty" />
                  <button
                    @click="quantityHandler(cart.id, cart.size, cart.price, 'decrement')"
                    class="cart-qty-btn"
                  >
                    -
                  </button>
                </div>
              </div>
            </td>
            <td>{{ rupiah(cart.subtotal) }}</td>
            <td>
              <button class="btn-delete" @click="deleteProductHandler(cart.id, cart.size)">
                <span>delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="col-4 align-self-end my-5">
        <button
          @click="checkout"
          class="btn btn-dark w-100 h-100"
          style="font-size: 14px; padding: 10px"
        >
          Check Out
        </button>
      </div>
    </div>
    <div v-else class="d-flex flex-column justify-content-center align-items-center">
      <img src="../assets/undraw_empty_cart.svg" alt="" class="img-fluid w-50" />
      <h3 class="my-5">Your carts is empty, add your favourite products first</h3>
    </div>
  </section>
</template>

<style scoped>
.box-qty {
  border: 1px solid silver;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.cart-qty-box {
  border: 1px solid silver;
  width: 8vw;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.cart-qty-btn {
  border: transparent;
  background-color: transparent;
  font-size: 1rem;
  color: silver;
}
.cart-qty-input {
  padding: 10px;
  text-align: center;
  width: 4vw;
  border: transparent;
}
.btn-delete {
  border: transparent;
  /* background-color: transparent; */
  font-size: 1rem;
  color: silver;
}
.border-custom {
  border-top: 1px solid #eaebee;
  border-bottom: 1px solid #eaebee;
}
</style>
