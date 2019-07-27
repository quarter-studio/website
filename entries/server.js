import Application from '../app/application'

export default (context) => {
  return new Promise((resolve, reject) => {
    const app = Application()

    context.rendered = () => {
      context.state = app.$store.state
    }

    const render = () => {
      const components = app.$router.getMatchedComponents()
      
      if (!components.length) {
        return reject({ code: 404 })
      }

      resolve(app)
    }

    app.$router.push(context.url)
    app.$router.onReady(render, reject)
  })
}