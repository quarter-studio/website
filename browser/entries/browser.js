// Vendor
import Vue from 'vue'

// Project
import router from '@/entries/router.js'
import store from '@/entries/store.js'
import App from '@/views/pages/App.vue'

// Config
Vue.config.productionTip = false

// Setup
export const render = (h) => h(App)
export const app = new Vue({ render, router, store })

app.$mount('#app')

// Base component
export default app
