var memoize = require('lodash/memoize')

var database = (id) => {
  var firebase = require('./firebase')
  return firebase(id).database()
}

module.exports = memoize(database)