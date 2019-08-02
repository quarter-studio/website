// Vendor
import { sync } from 'vuex-router-sync';
import Vue from 'vue';

// Project
import Router from './Router.js';
import Store from './Store.js';
import App from './views/App.vue';

// Config
Vue.config.productionTip = false;

// Setup
const render = (h) => {
  return h(App);
};

// Factory
export default () => {
  const router = Router();
  const store = Store();

  const config = {
    render,
    router,
    store,
  };

  const app = new Vue(config);

  sync(store, router);
 
  return app;
}