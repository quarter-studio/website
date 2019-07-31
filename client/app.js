// Vendor
import { sync } from 'vuex-router-sync'
import Vue from 'vue'

// Project
import Router from '@/router/router.js'
import Store from '@/store/store.js'
import Title from '@/mixins/title.js'
import App from '@/views/App.vue'

// Config
Vue.config.productionTip = false

Vue.mixin(Title)

// Factory
export default () => {
  const app = new Vue({
    render: (h) => h(App),
    router: Router(),
    store: Store(),
  })

  sync(app.$store, app.$router)
 
  return app
}