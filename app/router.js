import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue')
  },
  {
    path: '/item/:id',
    nam: 'item',
    component: () => import('./views/Item.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('./views/404.vue')
  }
]


export default () => {
  return new VueRouter({
    mode: 'history',
    routes
  })
}
