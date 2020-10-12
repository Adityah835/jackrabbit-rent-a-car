import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rent-cars',
    name: 'Rent Cars',
    component: () => import (/* webpackChunkName: "rent-cars" */ '../views/RentCars.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import (/* webpackChunkName: "rent-cars" */ '../views/Inventory.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignUp.vue')
  },
  {
    path: '/locations',
    name: 'Locations',
    component: () => import(/* webpackChunkName: "locations" */ '../views/Locations.vue')
  },
  {
    path: '/about-us',
    name: 'About Us',
    component: () => import(/* webpackChunkName: "about-us" */ '../views/AboutUs.vue')
  },
  {
    path: '/manage-employees',
    name: 'Manage Employees',
    component: () => import(/* webpackChunkName: "manage-employees" */ '../views/ManageEmployees.vue')
  }
    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
