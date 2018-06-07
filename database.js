const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Setting up the Database
module.exports = (settings) => {
  mongoose.connect(settings.DB)
  let db = mongoose.connection
  db.once('open', err => {
    if (err) {
      throw err
    }
    console.log('MongoDB ready!')
  })
  db.on('error', err => console.log(`Database error: ${err}`))
}