function setTitle () {
  let title = this.$options.title

  if (typeof title === 'function') {
    title = title.call(this)
  }

  this.setTitle(title)
}

const client = {
  mounted: setTitle,
  methods: {
    setTitle (title) {
      if (title) {
        document.title = title
      }
    }
  }
}

const server = {
  created: setTitle,
  methods: {
    setTitle (title) {
      if (title) {
        this.$ssrContext.title = title
      }
    }
  }
}

export default process.env.VUE_APP_ENV === 'server'
  ? server
  : client