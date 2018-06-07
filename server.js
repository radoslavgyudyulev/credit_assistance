const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config/config')
const CreditInformation = require('./models/Credit-Information')


const app = express()

// Middleware 
app.use(bodyParser.urlencoded({extended: true}))

// Setting up the server
app.listen(config.PORT, () => {
    console.log(`Listening on port: ${config.PORT}` )
})

// MongoDB Connection
require('./database')(config)

// Create new credit information
app.post('/credit', (req, res) => {
    const { firstName, lastName, email, mobile } = req.body
    const { creditAmount, monthlyIncome, months } = req.body 

    // Validation
    if(monthlyIncome > 999 && creditAmount < 15001) {
        saveTheCredit()
    } 
    if(monthlyIncome > 999 && creditAmount < 15001) {
        saveTheCredit()
    } 
    if(monthlyIncome > 1499 && creditAmount < 20001) {
        saveTheCredit()
    } 
    if(monthlyIncome > 1999 && creditAmount < 25001) {
        saveTheCredit()
    } else {
        res.send('Sorry, Your credit was rejected')
    }
   
    
    // After Validation => Saving the credit to Database
    function saveTheCredit() {
        CreditInformation.create({
            creditAmount: creditAmount,
            mobile: mobile,
            email: email,
            monthlyIncome: monthlyIncome,
            months: months,
            firstName: firstName,
            lastName: lastName,
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
    }

   
}) 

app.get('/credit', (req, res) => {
    // Here I will send email to the User if validation passed
    console.log('mail')
})