const CreditInformation = require('../models/Credit-Information')
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const nodemailer = require('nodemailer');

module.exports = (req, res) => {
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
        <a href="http://localhost:3001/verify?key + ${randomString}"><button>VERIFY</button></a>
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
    let hash = bcrypt.hashSync(randomString, 10);
    console.log(randomString)
    console.log(hash)
    CreditInformation.create({
        userData: {
            mobile: mobile,  
            email: email,
            firstName: firstName,
            lastName: lastName, 
            },
            creditData: {
            creditAmount: creditAmount,
            monthlyIncome: monthlyIncome,
            months: months,
            mothlyPayment: creditAmount / months,
            creditKey: hash
            }
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
    });
} 

}