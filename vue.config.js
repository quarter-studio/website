const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')

const resolve = {
  alias: {
    '@': __dirname
  },
}

const client = {
  entry: './entries/client.js',

  node: false,

  plugins: [
    new VueSSRClientPlugin()
  ],

  resolve,
}

const server = {
  entry: './entries/server.js',

  target: 'node',

  devtool: false,

  plugins: [
    new VueSSRServerPlugin()
  ],

  externals: nodeExternals({
    whitelist: /\.css$/
  }),

  output: {
    libraryTarget: 'commonjs2'
  },

  optimization: {
    splitChunks: false
  },

  resolve,
}

const config = {
  css: {
    extract: (
      process.env.VUE_APP_ENV !== 'server' &&
      process.env.NODE_ENV === 'production'
    )
  },

  configureWebpack: () => {
    return process.env.VUE_APP_ENV === 'server' ? server : client
  },

  outputDir: 'storage/build/public',
}

module.exports = config