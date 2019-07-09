import defaultsDeep from 'lodash/defaultsDeep'

var defaultConfig = {
  knob: { name: 'Test Knob', min: 0, max: 1, value: 0.5 },
  ambience: { name: 'Ambience', min: 0, max: 1, value: 0.4 },
  scale: { name: 'Scale', min: 0, max: 4, value: 0.25 },
  depth: { name: 'Height', min: 1, max: 400, value: 0.175 },
  seed: { name: 'Seed', min: 0, max: 1, value: 0.175 },
  zoom: { name: 'Zoom', min: 0, max: 120, value: 0.25 },
  fov: { name: 'Field of view', min: 50, max: 250, value: 0.4 }
}

var config = defaultConfig

export default {
  default () {
    return defaultConfig
  },

  use (value) {
    return config = defaultsDeep(value, defaultConfig)
  },

  get (key) {
    var value = config[key];
    var range = Math.abs(value.max - value.min);
    return value.min + range * value.value;
  }
}
