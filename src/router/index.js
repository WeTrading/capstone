import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/register'
import Cart from '../components/cart'
import empty from '../components/empty'
// import Home from '../components/home'
import Start from '../components/start'
import AddItem from '../components/addItem'
import Message from '../components/message'
import Header from '../components/header'
import Main from '../components/home2'
import Setting from '../components/setting'
import Product from '../components/product'
import ProductDetail from '../components/productdetail'
import { auth } from '../firebase'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/product',
    component: Product
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/empty',
    component: empty
  },
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
    path: '/product/:id',
    component: ProductDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    component: Cart
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
    component: Product,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addItem',
    component: AddItem,
    meta: {
      requiresAuth: true
    }
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
