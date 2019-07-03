var functions = require('firebase-functions')
var server = require('../quarter/server/server')
var app = server('app')

// view settings
app.set('view engine', 'pug')
app.set('views', 'resources/views')

// middleware
app.use('basic-auth')
app.use('compress')

// routes
app.get('/main.css', 'assets@style')
app.get('/main.js', 'assets@script')
app.get('/', 'pages@home')

// middleware
app.use('report-missing-page')
app.use('handle-error')

module.exports = functions.https.onRequest(app)