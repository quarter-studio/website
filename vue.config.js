const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')

const resolve = {
  alias: {
    '@': require('path').resolve(__dirname, 'client')
  },
}

const client = {
  entry: './client/main.js',

  node: false,

  plugins: [
    new VueSSRClientPlugin({
      filename: '../client-manifest.json'
    })
  ],

  resolve,
}

const server = {
  entry: './client/server.js',

  target: 'node',

  devtool: false,

  plugins: [
    new VueSSRServerPlugin({
      filename: '../server-bundle.json'
    })
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

  chainWebpack: config => {
    config.module
      .rule('webgl')
        .test(/\.(glsl|vs|fs|vert|frag)$/)
        .exclude
          .add(/node_modules/)
          .end()
        .use('raw')
          .loader('raw-loader')
          .end()
        .use('glslify')
          .loader('glslify-loader')
          .end()
  },

  configureWebpack: (config) => {
    return process.env.VUE_APP_ENV === 'server' ? server : client
  },

  outputDir: 'storage/build/public',
}

module.exports = config