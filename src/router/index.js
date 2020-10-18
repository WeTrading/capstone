import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/home'
Vue.use(Router)

export default new Router({
  routes: [

    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
/* const routes = [

]

const router = new VueRouter({
  routes
})

export default router
*/
