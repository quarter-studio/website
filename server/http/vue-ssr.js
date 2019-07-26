module.exports = (config) => (req, res) => {
  const template = require('fs').readFileSync('index.html', 'utf-8')
  const serverBundle = require('../storage/build/server-bundle.json')
  const clientManifest = require('../storage/build/client-manifest.json')
  const serverConfig = { template, clientManifest }
  const context = { url: req.url }

  const respond = (html) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(context.HTTPStatus || 200)
    res.send(html)
  }

  const report = (err) => {
    if (err.url) {
      return res.redirect(err.url)
    }

    res.status(500).end('500 | Internal Server Error')
    console.error(`error during render : ${req.url}`)
    console.error(err.stack)
  }

  require('vue-server-renderer')
    .createBundleRenderer(serverBundle, serverConfig)
    .renderToString(context)
    .then(respond)
    .catch(report)
}