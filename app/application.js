import { sync } from 'vuex-router-sync'
import Router from './router.js'
import Store from './store.js'
import Title from './mixins/title.mixin.js'
import App from './views/App.vue'
import Vue from 'vue'

Vue.config.productionTip = false

Vue.mixin(Title)

export default () => {
  const app = new Vue({
    render: (h) => h(App),
    router: Router(),
    store: Store(),
  })

  sync(app.$store, app.$router)
 
  return app
}