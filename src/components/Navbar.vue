<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from 'pinia'
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
            <a class="navbar-brand me-auto mb-2 mb-lg-0"
              ><img src="../assets/images/" height="50" alt=""
            /></a>
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink class="nav-link active" aria-current="page" :to="'/'">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" :to="'/carts'">My Carts</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" :to="'/login'">Sign In</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" :to="'/register'">Sign Up</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" :to="'/login'">Sign Out</RouterLink>
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
