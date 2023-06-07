<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  data() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        address: ''
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['handleRegister']),
    submitRegisterHandler() {
      this.handleRegister(this.userData)
    }
  }
}
</script>

<template>
  <div class="bg-body-secondary position-absolute w-100 min-vh-100">
    <section class="container">
      <div class="bg-body-secondary m-0 p-0 top-0 start-0">
        <div class="row m-0 p-0 min-vh-100 py-5 justify-content-center align-content-center">
          <div class="d-none d-md-flex col-6 p-0">
            <img src="../assets/undraw_welcome.svg" alt="register_image" />
          </div>
          <div class="col-12 col-md-6 p-0 d-flex align-items-center">
            <div class="card border px-4 py-5">
              <h1 class="text-center display-1 fs-1 fw-medium">Register</h1>
              <p class="text-center fw-light">Create new account for you</p>
              <form @submit.prevent="submitRegisterHandler">
                <div class="row d-flex justify-content-center">
                  <div class="mb-3 col-8 col-md-4">
                    <label class="form-label"
                      >First Name<span class="text-danger fw-bold">*</span></label
                    >
                    <input type="text" class="form-control" v-model="userData.firstName" />
                  </div>
                  <div class="mb-3 col-8 col-md-4">
                    <label class="form-label"
                      >Last Name<span class="text-danger fw-bold">*</span></label
                    >
                    <input type="text" class="form-control" v-model="userData.lastName" />
                  </div>
                  <div class="mb-3 col-8">
                    <label class="form-label"
                      >Phone Number<span class="text-danger fw-bold">*</span></label
                    >
                    <input type="text" class="form-control" v-model="userData.phoneNumber" />
                  </div>

                  <div class="mb-3 col-8">
                    <label for="email" class="form-label"
                      >Email address<span class="text-danger fw-bold">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="email-login"
                      name="email"
                      aria-describedby="emailHelp"
                      autocomplete="email"
                      v-model="userData.email"
                    />
                  </div>
                  <div class="mb-3 col-8">
                    <label for="password" class="form-label"
                      >Password<span class="text-danger fw-bold">*</span></label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="password-login"
                      autocomplete="off"
                      v-model="userData.password"
                    />
                  </div>
                  <div class="mb-3 col-8">
                    <label class="form-label"
                      >Address<span class="text-danger fw-bold">*</span></label
                    >
                    <textarea class="form-control" v-model="userData.address"></textarea>
                  </div>
                  <div class="col-8 d-flex flex-column align-items-center pt-3">
                    <button
                      type="submit"
                      class="btn btn-dark w-100 h-100"
                      style="font-size: 14px; padding: 10px"
                    >
                      Register
                    </button>
                    <p class="mb-0 mt-3">
                      <RouterLink :to="'/login'">Already have an account? Log in</RouterLink>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
img {
  max-width: 50vw;
}

a {
  color: #687d82;
}

a:hover {
  color: #94a7ab;
}
</style>
