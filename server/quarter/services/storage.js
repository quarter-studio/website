var memoize = require('lodash/memoize')

var storage = (bucket, id) => {
  var firebase = require('./firebase')
  var storage = firebase(id).storage()
  return storage.bucket(bucket)
}

module.exports = memoize(storage)