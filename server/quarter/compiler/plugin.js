module.exports = (name) => (input, ...args) => {
  var create = require(name)
  var plugin = create(...args)
  input.plugins.push(plugin)
}