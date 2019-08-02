// Setup
var mutations = {
  close: (state) => {
    state.visible = false;
  },

  open: (state) => {
    state.visible = true;
  },

  toggle: (state) => {
    state.visible = !state.visible;
  },
};

var state = () => {
  return {
    visible: false
  };
};

// Binding
export default {
  namespaced: true,
  mutations,
  state,
};