
module.exports = (config) => (req, res) => {
  const template = require('fs').readFileSync('index.html', 'utf-8')
  const serverBundle = require('../../storage/build/server-bundle.json')
  const clientManifest = require('../../storage/build/client-manifest.json')
  const serverConfig = { clientManifest, template }
  const context = { 
    url: req.url,
    title: 'Quarter',
  }

  const resolve = (html) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(context.HTTPStatus || 200)
    res.send(html)
  }

  const reject = (err) => {
    if (err.url) {
      res.redirect(err.url)
    } else {
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  require('vue-server-renderer')
    .createBundleRenderer(serverBundle, serverConfig)
    .renderToString(context)
    .then(resolve)
    .catch(reject)
}