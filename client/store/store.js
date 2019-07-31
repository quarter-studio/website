// Vendor
import Vuex from 'vuex'
import Vue from 'vue'

// Config
Vue.use(Vuex)

// Factory
export default () => {
  return new Vuex.Store({
    state: () => {
      return {
        //
      }
    },
  })
}