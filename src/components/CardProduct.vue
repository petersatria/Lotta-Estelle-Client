<script>
import { mapActions } from 'pinia'

export default {
  props: ['product'],
  methods: {
    toDetailProduct() {
      this.$router.push(`/products/${this.product.id}`)
    }
  },
  computed: {
    rupiah() {
      return this.product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    },
    nameProduct() {
      let name = this.product.name.split(' ')
      name.forEach((e, i) => {
        name[i] = name[i][0].toUpperCase() + name[i].substr(1)
      })
      name = name.join(' ')
      return name
    }
  }
}
</script>

<template>
  <div class="card h-100" @click="toDetailProduct">
    <div>
      <div class="img-wrapper">
        <img height="320" :src="product.imgUrl" alt="" />
      </div>
    </div>
    <div class="card-body d-flex flex-column justify-content-between">
      <p class="">{{ nameProduct }}</p>
      <p class="">{{ rupiah }}</p>
    </div>
  </div>
</template>

<style scoped>
img,
p,
h4 {
  cursor: pointer;
}

h4:hover {
  color: #f57a35;
  transition: 0.8s;
  font-weight: 700;
  font-size: 30px;
}

img {
  width: 100%;
  max-width: 100%;
  height: 320px;
  max-height: 100%;
  object-fit: cover;
  opacity: 1;
}
.img-wrapper {
  overflow: hidden;
  border-radius: 5px 5px 0 0;
  margin: 0 auto;
}

.img-wrapper img {
  width: 100%;
  transition: 0.5s all ease-in-out;
}

.card:hover {
  transform: scale(1.1);
}
</style>
