// Credit-Information.js
const mongoose = require('mongoose');  

const CreditInformation = new mongoose.Schema({  
  creditAmount: { type: Number, required: true },
  mobile: { type: Number, required: true },  
  email: { type: String, required: true },
  monthlyIncome: { type: Number, required: true },
  months: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
});

mongoose.model('CreditInformation', CreditInformation);
module.exports = mongoose.model('CreditInformation');