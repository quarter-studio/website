// Vendor
import Vuex from 'vuex';
import Vue from 'vue';

// Project
import MouseGraph from '@/support/store/plugins/MouseGraph.js';
import Animation from './animation/Plugin.js';
import Editor from './editor/Store.js';
import Window from '@/support/store/plugins/Window.js';

// Config
Vue.use(Vuex);

// Setup
const config = {
  modules: {
    editor: Editor,
  },

  plugins: [
    MouseGraph,
    Animation,
    Window,
  ],
};

// Factory
export default () => {
  return new Vuex.Store(config);
};