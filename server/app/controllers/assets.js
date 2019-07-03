module.exports = {
  async script (request, response, next) {
    try {
      var compiler = require('../../quarter/compiler/compiler')
      var output = { format: 'cjs' }
      var input = {
        input: 'resources/assets/scripts' + request.path,
        plugins: []
      }
    
      // if (false) {
      //   compiler.compress(input)
      // }

      var code = await compiler().code(input, output)

      response.send(code)
    } catch (error) {
      next(error)
    }
  },

  style (request, response) {
    var sass = require('node-sass')
    var result = sass.renderSync({
      file: 'resources/assets/styles/all.scss'
    })

    response.type('text/css')
    response.send(result.css)
  }
}