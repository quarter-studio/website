// Vendor
import defaultsDeep from 'lodash/defaultsDeep';
import Vue from 'vue';

// Setup
const mutations = {
  add: (state, config) => {
    Vue.set(state.configs, config.key, config.value);
  },

  remove: (state, key) => {
    Vue.delete(state.configs, key);
  },

  set: (state, options) => {
    const config = state.configs[state.key].config;

    config[options.key][options.option] = options.value;
  },

  update: (state, config) => {
    state.configs[config.key] = config.value;
  },

  use: (state, key) => {
    state.key = key;
  },
};

const actions = {
  add: (store, config) => {
    store.commit('add', config);

    if (!store.state.key) {
      store.commit('use', config.key);
    }
  },

  remove: (store, key) => {
    store.commit('remove', key);

    if (store.state.key === key) {
      store.commit('use', store.getters.first);
    }
  }
};

const getters = {
  config: (state) => {
    return state.configs[state.key];
  },

  first: (state) => {
    for (var key in state.configs) {
      return key;
    }
  },

  get: (state, getters) => {
    return (key) => {
      var option = getters.config.config[key];
      var min = Number(option.min);
      var max = Number(option.max);
      var value = Number(option.value);
      var range = Math.abs(max - min);

      return min + range * value;
    };
  },
};

const state = () => {
  return {
    key: null,
    configs: {},
  };
};

// Binding
export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
};
