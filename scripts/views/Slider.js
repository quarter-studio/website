export default {
  name: 'Slider',

  props: {
    name: String,
    precision: {
      type: Number,
      default: 10000
    }
  },

  data () {
    return {
      value: uniforms[this.name] * this.precision,
      styles: {
        display: 'flex',
        alignItems: 'center'
      },
      text: {
        width: '6ch',
        textAlign: 'center'
      },
      slider: {
        margin: 'auto 10px'
      }
    }
  },

  template: `
    <div :style="styles">
      <input :style="text" :value="value" @input="update" />
      <input :style="slider" type="range" min="0" :max="precision" :value="value" @input="update" />
      <label>{{ name.slice(9) }}</label>
    </div>
  `,

  methods: {
    update (event) {
      this.value = Number(event.target.value)
      uniforms[this.name] = this.value / this.precision
    }
  }
}
