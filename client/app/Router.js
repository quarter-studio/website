// Vendor
import VueRouter from 'vue-router';
import Vue from 'vue';

// Config
Vue.use(VueRouter);

// Setup
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => {
      return import('./home/Home.vue')
    },
  },
  {
    path: '*',
    name: '404',
    component: () => {s
      return import('./home/Home.vue')
      // return import('./errors/404.vue')
    },
  },
];

const mode = 'history';

const config = {
  routes,
  mode,
};

// Factory
export default () => {
  return new VueRouter(config);
};
