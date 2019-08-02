<script>
  export default {
    methods: {
      toggle() {
        this.$store.commit('editor/toggle');
      },
    },
  };
</script>

<template>
  <header class="header container navigation">
    <section class="left">
      <a @click="toggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="11" fill="#fff" fill-rule="evenodd">
          <path d="M17 5h5v1h-5zm-9 5h14v1H8zm6-5h1v1h-1zm-9 5h1v1H5zM0 5h12v1H0zm0 5h3v1H0zM8 0h14v1H8zM5 0h1v1H5zM0 0h3v1H0z"/>
        </svg>
      </a>
    </section>
    
    <section class="middle">
      <ul>
        <li>NY</li>
        <li>SF</li>
        <li>PDX</li>
      </ul>
    </section>
    
    <section class="right">
      <a class="link" href="mailto:contact@quarter.studio" target="blank">
        Contact us
      </a>
    </section>
  </header>
</template>

