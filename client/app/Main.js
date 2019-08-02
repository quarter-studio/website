// Project
import App from './App.js';

// Setup
const mount = () => {
  const state = window.__INITIAL_STATE__;

  if (state) {
    // app.$store.replaceState(state);
  }

  app.$mount('#app');
};

const app = App();

app.$router.onReady(mount);