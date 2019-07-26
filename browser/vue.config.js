// Vendor
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path').resolve.bind(__dirname)

// Project
const env = (value) => {
  return process.env.NODE_ENV === value
}

const target = (value) => {
  return process.env.VUE_APP_ENV === value
}

// Setup
const outputDir = path('../server/public')

const resolve = {
  alias: {
    '@': path('./')
  },
}

// Browser Vue Config
const browser = {
  configureWebpack: () => {
    return {
      entry: path('./entries/browser.js'),
    
      node: false,
    
      plugins: [
        new VueSSRClientPlugin()
      ],
    
      resolve,
    }
  },

  outputDir,
}

// Server Vue Config
const server = {
  configureWebpack: () => {
    return {
      devtool: false,
    
      entry: resolve('./entries/server.js'),
    
      externals: nodeExternals({
        whitelist: /\.css$/
      }),
    
      optimization: {
        splitChunks: false
      },

      output: {
        libraryTarget: 'commonjs2'
      },
      
      plugins: [
        new VueSSRServerPlugin()
      ],
    
      resolve,
    
      target: 'node',
    }
  },

  css: {
    extract: env('production')
  },

  outputDir,
}

// Vue Config
module.exports = target('server') ? server : browser