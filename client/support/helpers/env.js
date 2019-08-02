// Setup
var env = (namespace = '') => {
  namespace = namespace + ':';

  return {
    at (key) {
      return env(namespace + key);
    },

    clear () {
      return localStorage.clear();
    },

    delete (key) {
      return localStorage.removeItem(namespace + key);
    },

    get (key, fallback) {
      var value = localStorage.getItem(namespace + key);

      return value === null ? fallback : JSON.parse(value);
    },

    has (key) {
      return localStorage.getItem(namespace + key) !== null;
    },

    set (key, value) {
      var string = JSON.stringify(value);

      localStorage.setItem(namespace + key, string);

      return value;
    },
  };
};

// Binding
export default env('v1.1.1')