const client = {
  presets: [
    '@vue/app'
  ]
}

const server = {
  presets: [
    '@vue/app',
    {
      targets: {
        node: true
      }, 

      useBuiltIns: false,
    }
  ]
}

// const config = process.env.WEBPACK_ENV === 'server' ? server : client

if (true) {
  module.exports = client
} else {
  module.exports = server
}
