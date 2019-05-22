import { load } from './support.js'

load('https://cdn.jsdelivr.net/npm/vue', (event) => {
  Vue.component('slider', slider)
  var app = new Vue(editor)
  app.animation = animation
  app.$mount(
    document.body.appendChild(
      document.createElement('div')
    )
  )
})

var editor = {
  data: {
    animation: null,
    styles: {
      top: 0,
      left: 0,
      padding: '10px',
      position: 'absolute',
      background: 'rgba(50,50,50,0.7)'
    },
    button: {
      marginTop: '10px'
    }
  },

  template: `
    <div :style="styles">
      <slider v-for="option in animation.options" :name="option" :key="option" />
      <button :style="button" @click="randomize">Randomize</button>
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

var slider = {
  props: ['name'],

  data () {
    return {
      styles: {
        display: 'flex',
        alignItems: 'center'
      },
      text: {
        width: '5ch',
        textAlign: 'center'
      },
      slider: {
        margin: 'auto 10px'
      }
    }
  },

  computed: {
    value () {
      return animation.get(this.name)*1000
    }
  },

  template: `
    <div :style="styles">
      <input :style="text" :value="value" @input="update" />
      <input :style="slider" type="range" min="0" max="1000" :value="value" @input="update" />
      <label>{{ name }}</label>
    </div>
  `,

  methods: {
    update (event) {
      animation.set(this.name, Number(event.target.value)/1000)
    }
  }
}
