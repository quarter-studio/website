// Vendor
const functions = require('firebase-functions')
const express = require('express')

// Setup
const server = express()

// Middleware
const compression = require('compression')
server.use(compression())

const favicon = require('serve-favicon')
server.use(favicon('storage/build/public/favicon.ico'))

const files = express.static.bind(express)
server.use(files('storage/build/public'))

// Routes
server.get('*', (req, res) => {
  res.send(req.path)
})

// Trigger Server
exports.server = functions.https.onRequest(server)