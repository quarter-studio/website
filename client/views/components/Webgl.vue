<script>
  export default {
    props: {
      render: {
        type: Function,
        required: true
      }
    },

    mounted () {
      this.$render(0)
    },

    methods: {
      $render (time) {
        requestAnimationFrame(this.$render)
        if (true) {
          this.render(this.context, time)
        }
      }
    }
  }
</script>

<template>
  <canvas />
</template>

