<script>
  export default {
    name: 'Slider',
    
    props: {
      config: Object,
      precision: {
        type: Number,
        default: 10000
      }
    },

    computed: {
      isMultiline () {
        return this.config.name.indexOf('<br') !== -1
      },

      value: {
        get () {
          return Math.round(this.config.value * this.precision)
        },

        set (value) {
          this.config.value = Math.round(Number(value)) / this.precision
        }
      },

      min: {
        get () {
          return this.config.min
        },

        set (value) {
          this.config.min = Number(value)
        }
      },

      max: {
        get () {
          return this.config.max
        },

        set (value) {
          this.config.max = Number(value)
        }
      }
    },

    methods: {
      output (event) {
        var value = Number(event.target.value)
        this.config.value = Math.round(value) / this.precision
      }
    }
  }
</script>

<template>
  <tr :class="$style.module">
    <td>
      <label :class="[$style.name, isMultiline && $style.small]" v-html="config.name" />
    </td>

    <td>
      <input :class="$style.text" type="number" v-model="min"/>
      <input :class="$style.slider" type="range" v-model="value" min="0" :max="precision" />
      <input :class="$style.text" type="number" v-model="max"/>
    </td>
  </tr>
</template>

<style module>
  .module {
    color: inherit;
    /* display: flex; */
    /* align-items: center; */
  }

  .name {
    padding-right: 1rem;
  }

  tr, td {
    font-size: inherit;
  }

  .small {
    font-size: 9px;
    line-height: 11px;
    display: block;
  }

  .text::-webkit-inner-spin-button,
  .text::-webkit-inner-spin-button {
    -webkit-appearance: none; 
    margin: 0;
  }
  
  .text {
    width: 6ch;
    color: inherit;
    text-align: center;
    background: transparent;
    border: 1px solid grey;
    border-radius: 4px;
    padding: 2px 0;
  }

  .slider {
    margin: auto 10px;
    max-width: 120px;
    vertical-align: sub;
  }
</style>
