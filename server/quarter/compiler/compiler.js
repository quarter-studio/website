var memoize = require('lodash/memoize')

var compiler = () => {
  var compiler = Object.create(null)
  var plugin = require('./plugin')

  compiler.compress = plugin('@ampproject/rollup-plugin-closure-compiler')

  compiler.include = plugin('rollup-plugin-virtual')

  compiler.compile = async (input, output) => {
    var rollup = require('rollup')
    var bundle = await rollup.rollup(input)
    var result = await bundle.generate(output)
    return result
  }

  compiler.code = async (...args) => {
    var result = await compiler.compile(...args)
    return result.output[0].code
  }
  
  return compiler
}

module.exports = memoize(compiler)

