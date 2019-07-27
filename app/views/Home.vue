<script>
  import Nav1 from '@/app/views/Nav1.vue'

  export default {
    title: 'Home',

    components: {
      Nav1
    }
  }
</script>


<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <nav-1/>
    <h1>
      <span class="red">This is the</span>
      <span :class="$style.blue">home page.</span>
    </h1>
  </div>
</template>

<style module>
  .blue {
    color: blue;
  }
</style>

<style scoped>
  .red {
    color: red;
  }
</style>


