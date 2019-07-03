var memoize = require('lodash/memoize')

var firebase = (id = process.env.GCLOUD_PROJECT) => {
  var firebase = require('firebase-admin')
  var cert = require(`../../storage/private/${id}.json`)
  
  var config = {
    credential: firebase.credential.cert(cert),
    databaseURL: `https://${id}.firebaseio.com`,
    storageBucket: `${id}.appspot.com`,
  }

  return firebase.initializeApp(config, id)
}

module.exports = memoize(firebase)