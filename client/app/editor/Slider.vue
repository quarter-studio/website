<script>  
  export default {    
    props: {
      id: String,
      name: String,
      min: Number,
      max: Number,
      value: Number,
      precision: {
        type: Number,
        default: 10000
      }
    },

    computed: {
      isMultiline () {
        return this.name.indexOf('<br') !== -1
      },

      $value: {
        get () {
          return Math.round(this.value * this.precision)
        },

        set (value) {
          value = Math.round(Number(value)) / this.precision;

          return this.update('value', value);
        }
      },

      $min: {
        get () {
          return this.min;
        },

        set (value) {
          return this.update('min', value)
        }
      },

      $max: {
        get () {
          return this.max;
        },

        set (value) {
          return this.update('max', value)
        }
      }
    },

    methods: {
      output (event) {
        // var value = Number(event.target.value)
        // this.config.value = Math.round(value) / this.precision
      },

      update (option, value) {
        var options = {
          key: this.id,
          value: Number(value),
          option,
        };

        this.$store.commit('animation/set', options);
      }
    }
  }
</script>

<template>
  <tr :class="$style.module">
    <td>
      <label :class="[$style.name, isMultiline && $style.small]" v-html="name" />
    </td>

    <td>
      <input :class="$style.text" type="number" v-model="$min"/>
      <input :class="$style.slider" type="range" v-model="$value" min="0" :max="precision" />
      <input :class="$style.text" type="number" v-model="$max"/>
    </td>
  </tr>
</template>

<style module>
  .module {
    color: inherit;
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

  /* The slider itself */
  .slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 18px; /* Specified height */
    background: transparent; /* Grey background */
    outline: none; /* Remove outline */
    border: 1px solid grey;
    border-radius: 9px;
    transform: translate(0, 2px);
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */ 
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    border-radius: 9px;
    border: 1px solid white;
    width: 18px; /* Set a specific slider handle width */
    height: 18px; /* Slider handle height */
    background: black; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .slider::-moz-range-thumb {
    width: 18px; /* Set a specific slider handle width */
    height: 18px; /* Slider handle height */
    border-radius: 9px;
    border: 1px solid white;
    background: black; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
</style>
