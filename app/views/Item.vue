<script>
  export default {
    computed: {
      item () {
        return this.$store.state.items[this.$route.params.id]
      }
    },

    watch: {
      $route: 'fetchItem'
    },

    serverPrefetch () {
      return this.fetchItem()
    },

    mounted () {
      if (!this.item) {
        this.fetchItem()
      }
    },

    methods: {
      fetchItem () {
        this.setTitle('Item ...')
        return this.$store
          .dispatch('fetchItem', this.$route.params.id)
          .then(item => {
            this.setTitle(item.name)
          })
      }
    }
  }
</script>

<template>
  <div>
    <h1 v-if="item">{{ item.name }}</h1>
    <h1 v-else>...</h1>
  </div>
  
</template>