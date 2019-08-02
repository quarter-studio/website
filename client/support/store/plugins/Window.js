// Vendor
import getWindowSize from 'get-window-size';

// Setup
const mutations = {
  resize: Object.assign,
};

const state = () => {
  return {
    height: 800,
    width: 1200,
  };
};

const Store = {
  namespaced: true,
  mutations,
  state,
};

// Factory
export default (store) => {
  store.registerModule('window', Store);

  if (typeof window !== 'undefined') {
    const resize = () => {
      const size = getWindowSize();

      store.commit('window/resize', size);
    }

    window.addEventListener('resize', resize);

    resize();
  }
};