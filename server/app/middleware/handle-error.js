module.exports = (error, request, response, next) => {
  var inDebug = 'debug' in request.query
  var inDev = process.env.ENV === 'development'
  
  if (inDev && inDebug) {
    return response.end(error.stack)
  }

  var handle = (error, html) => {
    if (error) {
      response.status(500)
      response.render('errors/500', { error }, fallback)
    } else {
      response.send(html)
    }
  }

  var fallback = (error, html) => {
    if (error) {
      response.end('Internal Service Error.')
    } else {
      response.send(html)
    }
  }

  error.code = Number.isInteger(error.code) ? error.code : 500
  
  var view = `errors/${error.code}`
  var data = { error }

  response.status(error.code)
  response.render(view, data, handle)
}