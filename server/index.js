if (!process.env.ENV) {
  if (process.env.GCLOUD_PROJECT.includes('development')) {
    process.env.ENV = 'development'
  } else {
    process.env.ENV = 'production'
  }
}

exports.serve = require('./triggers/serve')