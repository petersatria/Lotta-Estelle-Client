<template>
  <section class="container">
    <h2 class="text-center">Page {{ $route.fullPath }} is not found</h2>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <RouterLink :to="'/'">Redirect to Home</RouterLink>
      <img src="../assets/404.svg" alt="" />
    </div>
  </section>
</template>

<style scoped>
a {
  color: #687d82;
}

a:hover {
  color: #94a7ab;
}
</style>
