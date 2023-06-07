<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'
import Footer from '../src/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
    <Footer v-if="$route.name !== 'login' && $route.name !== 'register'" />
  </div>
</template>

<style>
* {
  font-family: 'Poppins', sans-serif;
}
</style>
