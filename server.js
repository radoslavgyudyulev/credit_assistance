const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config/config')
const CreditInformation = require('./models/Credit-Information')
const bcrypt = require('bcrypt');


const app = express()

// Random string generator for email verification
const randomstring = require("randomstring");

app.use(express.static('public'))

// Mail sender 
const nodemailer = require('nodemailer');


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
    const { creditAmount, monthlyIncome, months, creditKey } = req.body 
    // random string will be used for account authentication
    const randomString = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
      });

    // Validation
    if(monthlyIncome > 999 && creditAmount < 15001) {
        saveTheCredit()
        sendMail()
    } 
    if(monthlyIncome > 999 && creditAmount < 15001) {
        saveTheCredit()
        sendMail()
    } 
    if(monthlyIncome > 1499 && creditAmount < 20001) {
        saveTheCredit()
        sendMail()
    } 
    if(monthlyIncome > 1999 && creditAmount < 25001) {
        saveTheCredit()
        sendMail()
    }
    if(monthlyIncome > 2500) {
        saveTheCredit()
        sendMail()
     } 


    // Sending email with creditKey
    function sendMail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: '4TestingTurposes',
               pass: '@4TestingTurposes'
           }
       });
       const mailOptions = {
        from: 'radoslav.gyudyulev@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Your Credit Information', // Subject line
        html:` <p>
         All information about your credit can be found
         http://localhost:3001/profile</p><br/>
         <h3>Verify your credit</h3>
         <a href="http://localhost:3001/verify"><button>VERIFY</button></a>
         <p>Your secret key:  ${randomString}</p>`// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    }


    
    // After Validation => Saving the credit to Database
    function saveTheCredit() {
        console.log(randomString)
        //let hash = bcrypt.hashSync(randomString, 10);
        CreditInformation.create({
            creditAmount: creditAmount,
            mobile: mobile,
            email: email,
            monthlyIncome: monthlyIncome,
            months: months,
            firstName: firstName,
            lastName: lastName,
            mothlyPayment: creditAmount / months,
            creditKey: randomString
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
    }

   
}) 

app.post('/profile', (req, res) => {
    // Response with all information about credit
        CreditInformation.find({creditKey: hash})
       .then(response => res.json(response))
})

app.post('/verify', (req, res) => {
     const key = req.body.key
     CreditInformation.findOneAndUpdate({creditKey: key}, {$set:{verified:true}}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        
    });

})