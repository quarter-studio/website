//Setup
function setTitle () {
  let title = this.$options.title;

  if (typeof title === 'function') {
    title = title.call(this);
  }

  if (title) {
    this.setTitle(title);
  }
};

const client = {
  mounted: setTitle,

  methods: {
    setTitle (title) {
      return document.title = title;
    },
  },
};

const server = {
  created: setTitle,

  methods: {
    setTitle (title) {
      return this.$ssrContext.title = title
    },
  },
};

// Binding
export default process.env.VUE_APP_ENV === 'server' ? server : client;