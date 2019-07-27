<template>
  <nav :class="$style.container">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/item/1">Item 1</router-link> |
    <router-link to="/item/2">Item 2</router-link>
  </nav>
</template>

<style module>
  .container {
    background: black;
  }
</style>

