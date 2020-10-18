import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/register'
import Home from '../components/home'
import Start from '../components/start'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/start'
    },
    { path: '/start', component: Start },
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/register', component: Register }
  ]
})
/* const routes = [

]

const router = new VueRouter({
  routes
})

export default router
*/
