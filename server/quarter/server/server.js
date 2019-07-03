var memoize = require('lodash/memoize')

var server = (name) => {
  var express = require('express')
  var route = require('./route')

  var app = express()
  var get = app.get
  var use = app.use

  app.get = function (path, ...routes) {
    routes = routes.map(route)
    return get.call(app, path, ...routes)
  }

  app.use = function (...routes) {
    routes = routes.map(route)
    return use.apply(app, routes)
  }

  return app
}

module.exports = memoize(server)