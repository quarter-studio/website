import Application from '../app/application'

const app = Application()

const mount = () => {
  const state = window.__INITIAL_STATE__

  if (state) {
    app.$store.replaceState(state)
  }

  app.$mount('#app')
}

app.$router.onReady(mount)