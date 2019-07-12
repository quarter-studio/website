import defaultsDeep from 'lodash/defaultsDeep'

var defaultConfig = {
  _testA: { name: 'Test A', min: 0, max: 1, value: 0.5 },
  _testB: { name: 'Test B', min: 0, max: 1, value: 0.5 },
  ambience: { name: 'Ambient Light', min: 0, max: 1, value: 0.4 },
  scale: { name: 'Scale', min: 0, max: 4, value: 0.25 },
  gradientDither: { name: 'Gradient Dither', min: 0, max: 1, value: 0.7 },
  depth: { name: 'Height', min: 1, max: 400, value: 0.175 },
  seed: { name: 'Seed', min: 0, max: 1, value: 0.175 },
  zoom: { name: 'Camera Zoom', min: 0, max: 120, value: 0.25 },
  fov: { name: 'Field of view', min: 50, max: 250, value: 0.4 },
  noise: { name: 'Noise Size', min: 0, max: 4, value: 0.25 },
  windSpeedMin: { name: 'Wind Speed<br/>Mininum', min: 0, max: 100, value: 0.1 },
  windSpeedMax: { name: 'Wind Speed<br/>Maximum', min: 0, max: 100, value: 0.5 },
  windSpeedEase: { name: 'Wind Speed<br/>Change Ease', min: 0, max: 1, value: 0.1 },
  windDirectionEase: { name: 'Wind Direction<br/>Change Ease', min: 0, max: 1, value: 0.1 },
  windInfluenceInner: { name: 'Wind Influence<br/>Inner Radius', min: 0, max: 1, value: 0.1 },
  windInfluenceOuter: { name: 'Wind Influence<br/>Outer Radius', min: 0, max: 1, value: 0.5 },
  gradientSize: { name: 'Gradient Size', min: 0, max: 1, value: 0.08 },
  gradient: { name: 'Gradient', min: 0, max: 1, value: 0.85 },
  gradientRamp: { name: 'Gradient Ramp', min: 0, max: 1, value: 0.9 },
  lineThickness: { name: 'Line Thickness', min: 0, max: .01, value: 0.3 },
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
