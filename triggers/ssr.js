const express = require('express')
const server = express()

if (process.env.GCLOUD_PROJECT.endsWith('-private')) {
  const auth = require('./http/basic-auth')
  server.use(auth())
}

const compression = require('compression')
server.use(compression())

const favicon = require('serve-favicon')
server.use(favicon('storage/build/public/favicon.ico'))

const files = express.static.bind(express)
server.use('/css', files('storage/build/public/css'))
server.use('/img', files('storage/build/public/img'))
server.use('/js', files('storage/build/public/js'))

const vue = require('./http/vue-ssr.js')
server.get('*', vue())

module.exports = require('firebase-functions').https.onRequest(server)
