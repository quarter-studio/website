<script>
  import Animation from '@/app/animation/Animation.vue';

  export default {
    components: {
      Animation,
    },

    watch: {
      '$store.state.animation.key' (key) {
      }
    },
  };
</script>

<template>
  <transition name="fade">
    <span v-if="$store.state.animation.key" class="animation">
      <animation class="shader"/>
      <span class="fader"/>
    </span>
  </transition>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>



