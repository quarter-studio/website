// Vendor
import VueRouter from 'vue-router'
import Vue from 'vue'

// Config
Vue.use(VueRouter)

// Base Router
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/pages/Home.vue')
    },
    {
      path: '/about',
      component: () => import('@/views/pages/About.vue')
    }
  ]
})
