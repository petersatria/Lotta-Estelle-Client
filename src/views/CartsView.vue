<script>
export default {
  data() {
    return {
      carts: []
    }
  },
  created() {
    this.carts = JSON.parse(localStorage.getItem('carts'))
    console.log(this.carts)
  }
}
</script>

<template>
  <section class="container">
    <h1 class="text-center">My Carts</h1>
    <div class="d-flex flex-column justif-content-center align-items-center py-5">
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
              <img
                src="https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/5237fa429d84abfa6e515254dd09d18fe455efb0_xxl-1.jpg"
                class="Cart_imageTable__UIT9I"
                width="100"
              /><span class="m-2">Oversized Cotton T-shirt (S)</span>
            </td>
            <td>Rp 379900</td>
            <td>
              <div class="d-flex align-items-center">
                <span style="color: silver">QTY:</span>
                <div class="box-qty">
                  <button class="cart-qty-btn">+</button
                  ><input class="cart-qty-input" placeholder="1" />
                  <button class="cart-qty-btn">-</button>
                </div>
              </div>
            </td>
            <td>Rp 379900.00</td>
            <td>
              <button>
                <span>delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="btn btn-success">Check Out</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.box-qty {
  border: 1px solid silver;
  width: 8vw;
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
button {
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
