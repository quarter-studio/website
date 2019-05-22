import fs from './noise.fs'
import vs from './noise.vs'

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
      // mag: context.NEAREST,
      mag: 'NEAREST',
      src: '/images/noise.png'
    },
    terrain: {
      src: '/images/terrain.png'
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
