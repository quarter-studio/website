// Project
import App from './App.js';

// Factory
export default (context) => {
  const promise = (resolve, reject) => {
    const app = App();

    context.rendered = () => {
      context.state = app.$store.state;
    };

    const render = () => {
      const views = app.$router.getMatchedComponents();
      
      if (!views.length) {
        const error = {
          code: 404,
        };

        reject(error);
      } else {
        resolve(app);
      }
    };

    app.$router.push(context.url);
    app.$router.onReady(render, reject);
  };

  return new Promise(promise);
};