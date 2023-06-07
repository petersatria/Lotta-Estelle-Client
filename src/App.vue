<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
  </div>
</template>

<style>
* {
  font-family: 'Poppins', sans-serif;
}
</style>
