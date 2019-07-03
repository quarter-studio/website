import Slider from './Slider.js'

export default {
  name: 'Editor',

  components: {
    slider: Slider,
  },

  data: {
    options: Object.keys(uniforms)
      .filter(
        (key) => key.startsWith('u_option_')
      ),
    styles: {
      top: 0,
      left: 0,
      zIndex: 10,
      padding: '10px',
      position: 'absolute',
      background: 'rgba(50,50,50,0.7)'
    },
    button: {
      marginTop: '10px'
    },
    input: {
      width: '4ch',
      textAlign: 'center'
    }
  },

  template: `
    <div :style="styles">
      <slider v-for="option in options" :name="option" :key="option" />
      <button v-if="false" :style="button" @click="randomize">Randomize</button>
    </div>
  `,

  methods: {
    randomize () {
      this.animation.options.forEach(
        (key) => animation.set(key, Math.random())
      )
    }
  }
}