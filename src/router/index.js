import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailProductView from '../views/DetailProductView.vue'
import CartsView from '../views/CartsView.vue'
import AdminView from '../views/AdminView.vue'
import FormProductView from '../views/FormProductView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products/:id',
      name: 'detail-product',
      component: DetailProductView
    },
    {
      path: '/carts',
      name: 'carts',
      component: CartsView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: FormProductView
    },
    {
      path: '/edit-product/:id',
      name: 'edit-product',
      component: FormProductView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.access_token && to.name === 'login' || localStorage.access_token && to.name === 'register') {
    next({ name: 'home' })
  } else if (!localStorage.access_token && to.name === 'carts' || !localStorage.access_token && to.name === 'admin') {
    next({ name: 'login' })
  } else if (localStorage.access_token && to.name === 'admin' && localStorage.role !== 'Admin') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
