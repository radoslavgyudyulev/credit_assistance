const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config/config')
const controllers = require('./controllers')
const app = express()

// Middleware 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
// Setting up the server
app.listen(config.PORT, () => {
    console.log(`Listening on port: ${config.PORT}` )
})
// MongoDB Connection
require('./database')(config)
// Routes
app.post('/credit', controllers.creditPage)
app.post('/profile', controllers.profilePage)
app.post('/verify', controllers.verifyPage)


// TO FIX
// database structure must be fixed ==> DONE
// creditKey must be crypted ==> DONE
// Fix the structure of the application ==> DONE
