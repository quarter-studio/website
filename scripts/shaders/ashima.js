import fs from './ashima.fs'
import vs from './ashima.vs'

export default {
  fs: fs,
  vs: vs,
  buffer: {
    position: [
      -1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0
    ]
  },
  textures: {
    noise: {
      mag: 'NEAREST',
      src: "/images/noise.png"
    },
    ashima1: {
      src: "/images/ashima1.png"
    },
    ashima2: {
      src: "/images/ashima2.png"
    }
  },
  options: {
    blur_x: .5,
    blur_y: .55,
    dither: .3,
    size: .3,
    edge: .425,
    gamma: .3,
    viscosity: .15,
  }
}
