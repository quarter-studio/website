module.exports = (request, response, next) => {
  var message = 'Page not found.'
  var error = new Error(message)
  error.code = 404
  next(error)
}