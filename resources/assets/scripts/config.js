import defaultsDeep from 'lodash/defaultsDeep'

var defaultConfig = {
  knob: { name: 'Test Knob', min: 0, max: 1, value: 0.5 },
  ambience: { name: 'Ambient Light', min: 0, max: 1, value: 0.4 },
  scale: { name: 'Scale', min: 0, max: 4, value: 0.25 },
  depth: { name: 'Height', min: 1, max: 400, value: 0.175 },
  seed: { name: 'Seed', min: 0, max: 1, value: 0.175 },
  zoom: { name: 'Camera Zoom', min: 0, max: 120, value: 0.25 },
  fov: { name: 'Field of view', min: 50, max: 250, value: 0.4 },
  noise: { name: 'Noise', min: 0, max: 4, value: 0.25 },
  windSpeedEasing: { name: 'Wind Speed<br/>Change Ease', min: 0, max: 1, value: 0.1 },
  windInfluenceInner: { name: 'Wind Influence<br/>Inner Radius', min: 0, max: 1, value: 0.1 },
  windInfluenceOuter: { name: 'Wind Influence<br/>Outer Radius', min: 0, max: 1, value: 0.5 },
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
