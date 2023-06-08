<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  computed: {
    ...mapState(useUserStore, ['access_token', 'role']),
    currentPage() {
      return this.$route.name
    }
  },
  methods: {
    ...mapActions(useUserStore, ['handleLogout']),
    logoutHandler() {
      this.handleLogout()
    }
  }
}
</script>

<template>
  <section>
    <div class="container-fluid m-0 p-0">
      <nav class="navbar navbar-expand-md">
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <RouterLink class="navbar-brand me-auto mb-2 mb-lg-0" :to="'/'"
              ><h2 class="p-0 m-0">Lotta Estelle</h2></RouterLink
            >
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink
                  class="nav-link active"
                  aria-current="page"
                  :to="'/admin'"
                  v-if="access_token && role === 'Admin'"
                  >Admin</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" :to="'/carts'" v-if="access_token"
                  >My Carts</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" :to="'/histories'" v-if="access_token"
                  >My Histories</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink
                  class="nav-link"
                  :to="'/login'"
                  v-if="currentPage !== 'login' && !access_token"
                  >Sign In</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink
                  class="nav-link"
                  :to="'/register'"
                  v-if="currentPage !== 'register' && !access_token"
                  >Sign Up</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink
                  class="nav-link"
                  :to="'/login'"
                  v-if="access_token"
                  @click="logoutHandler"
                  >Sign Out</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
