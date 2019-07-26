const resolve = require('path').resolve.bind(__dirname)

const configureWebpack = (config) => ({
  entry: resolve('./entries/browser.js'),
  resolve: {
    alias: {
      '@': resolve('./')
    },
  },
})

module.exports = {
  configureWebpack,
}