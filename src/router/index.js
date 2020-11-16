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
    path: '/manage-employees',
    name: 'Manage Employees',
    component: () => import(/* webpackChunkName: "manage-employees" */ '../views/ManageEmployees.vue'),
    meta:{
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
    path: '/employee-signup',
    name: 'Employee Sign Up',
    component: () => import(/* webpackChunkName: "employee-signup" */ '../views/EmployeeSignUp.vue'),
    meta:{
      requiresAuth: true
    }
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
    path: '/new-reservation',
    name: 'New Reservation',
    component: () => import(/* webpackChunkName: "new-reservation" */ '../views/NewReservation.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/reservation-success',
    name: 'Reservation Success',
    component: () => import(/* webpackChunkName: "reservation-success" */ '../views/ReservationSuccess.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/view-reservations',
    name: 'View Reservations',
    component: () => import(/* webpackChunkName: "view-reservations" */ '../views/ViewReservations.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/modify-reservation',
    name: 'Modify Reservation',
    component: () => import(/* webpackChunkName: "modify-reservation" */ '../views/ModifyReservation.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/pick-up-car',
    name: 'Pick Up Car',
    component: () => import(/* webpackChunkName: "pick-up-car" */ '../views/PickUpCar.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/view-employees',
    name: 'View Employees',
    component: () => import(/* webpackChunkName: "view-employees" */ '../views/ViewEmployees.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/payment',
    name: 'Payment Page',
    component: () => import(/* webpackChunkName: "payment" */ '../views/Payment.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/payment-success',
    name: 'Payment Success',
    component: () => import(/* webpackChunkName: "payment-success" */ '../views/PaymentSuccess.vue'),
    meta:{
      requiresAuth: true
    }
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
