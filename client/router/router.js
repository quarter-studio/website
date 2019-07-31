// Vendor
import VueRouter from 'vue-router'
import Vue from 'vue'

// Project
import Routes from '@/router/routes.js'

// Config
Vue.use(VueRouter)

// Factory
export default () => {
  return new VueRouter({
    mode: 'history',
    routes: Routes()
  })
}
