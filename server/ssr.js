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
server.use(files('storage/build/public'))

const vue = require('./http/vue-ssr.js')
server.get('*', vue())

module.exports = require('firebase-functions').https.onRequest(server)
