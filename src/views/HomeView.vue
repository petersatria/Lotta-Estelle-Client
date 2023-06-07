<script>
import Card from '../components/Card.vue'
export default {
  components: {
    Card
  }
}
</script>

<template>
  <section class="container">
    <div class="row g-5">
      <h1 class="text-center">Products</h1>
      <div class="col-6 col-md-3">
        <Card />
      </div>
      <div class="col-6 col-md-3">
        <Card />
      </div>
      <div class="col-6 col-md-3">
        <Card />
      </div>
      <div class="col-6 col-md-3">
        <Card />
      </div>
    </div>
  </section>
</template>
