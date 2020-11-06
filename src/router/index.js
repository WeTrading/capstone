import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/register'
import Home from '../components/home'
import Start from '../components/start'
import AddItem from '../components/addItem'
import Header from '../components/header'
import Main from '../components/home2'
import Setting from '../components/setting'
import Product from '../components/product'
import { auth } from '../firebase'

Vue.use(Router)

const routes = [
  {
    path: '/homee',
    component: Main
  },
  {
    path: '/header',
    component: Header
  },
  {
    path: '/setting',
    component: Setting
  },
  {
    path: '/product',
    component: Product
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/start',
    component: Start,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addItem',
    component: AddItem
  }
]

const router = new Router({
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/start')
  } else {
    next()
  }
})

export default router

/* const routes = [
]
const router = new VueRouter({
  routes
})
export default router
*/
