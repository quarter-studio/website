// Project
import hypot from '@/support/helpers/hypot.js'

// Setup
const mutations = {
  update: Object.assign,
};

const state = () => {
  return {
    radius: 0,
    theta: 0,
  };
};

const Store = {
  namespaced: true,
  mutations,
  state,
};

// Factory
export default (store) => {
  store.registerModule('mouseGraph', Store);

  const mousemove = (event) => {
    var width = store.state.window.width / 2;
    var height = store.state.window.height / 2;
    var radius = hypot(width, height);
    var x = event.clientX - width;
    var y = event.clientY - height;
    var graph = {
      radius: hypot(x, y) / radius,
      theta: Math.atan2(y, x),
    };

    store.commit('mouseGraph/update', graph);
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', mousemove);
  }
};


