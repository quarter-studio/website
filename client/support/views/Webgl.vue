<script>
  // Vendor
  import { resizeCanvasToDisplaySize } from 'twgl.js';
  import debounce from 'lodash/debounce';

  // Component
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },

      context: {
        type: Object,
        default: () => {
          return {
            alpha: false,
          };
        },
      },
    },

    data () {
      return {
        delta: 0,
        time: 0,
      };
    },

    mounted () {
      this.frame = requestAnimationFrame(this.update);

      this.canvas = document.getElementById(this.id);
      this.webgl = this.canvas.getContext('webgl', this.context);

      this.$emit('init', this.webgl);

      this.resize();
      this.resize = debounce(this.resize, 50);

      window.addEventListener('resize', this.resize);
    },

    destroyed () {
      this.frame = cancelAnimationFrame(this.frame);

      window.removeEventListener('resize', this.resize);
    },

    methods: {
      update (time) {
        this.frame = requestAnimationFrame(this.update);
        
        if (this.canvas.getBoundingClientRect().bottom > 0) {
          this.delta = time - this.time;
          this.time = time;
          this.$emit('update', this.webgl, this.delta, time);
        }
      },

      resize () {
        resizeCanvasToDisplaySize(this.canvas, window.devicePixelRatio);

        this.webgl.viewport(0, 0, this.canvas.width, this.canvas.height);

        this.$emit('resize', this.webgl);
      },
    },
  };
</script>

<template>
  <canvas :id="id"/>
</template>


