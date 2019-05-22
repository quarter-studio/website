export default (canvas, config) => {
  var context = canvas.getContext('webgl')
  var buffer = twgl.createBufferInfoFromArrays(context, config.buffer)
  var fs = config.fs

  for (var key in config.options) {
    fs = fs.replace('#endif', `#endif\nuniform float u_${key};\n`)
  }

  var textures = {
    ...config.textures
  }

  for (var key in textures) {
    var texture = textures[key] = {
      ...textures[key]
    }

    if (texture.mag) {
      texture.mag = context[texture.mag]
    }
  }

  textures = twgl.createTextures(context, textures)

  var program = twgl.createProgramInfo(context, [config.vs, fs])

  context.useProgram(program.program)

  twgl.setBuffersAndAttributes(context, program, buffer)

  var uniforms = {
    u_time: 0,
    u_mouse: [0,0]
  }

  var shader = {
    _uniforms: uniforms, // hack for reactive editor
    enabled: true,
    options: Object.keys(config.options),
    render: () => {
      if (shader.enabled) {
        twgl.setUniforms(program, uniforms)
        twgl.drawBufferInfo(context, buffer)
      }
    },
    get: (key) => uniforms[`u_${key}`],
    set: (key, value) => {
      uniforms[`u_${key}`] = value
    }
  }

  for (var key in config.textures) {
    shader.set(key, textures[key])
  }

  for (var key in config.options) {
    shader.set(key, config.options[key])
  }

  return shader
}
