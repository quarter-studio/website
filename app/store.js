import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const fetchItem = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve({
        name: 'Item ' + id
      }),
      1000
    )
  })
}

export default () => {
  return new Vuex.Store({
    state: () => ({
      items: {}
    }),

    actions: {
      fetchItem ({ commit }, id) {
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
          return item
        })
      }
    },

    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}