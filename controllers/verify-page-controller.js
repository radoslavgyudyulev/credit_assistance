const CreditInformation = require('../models/Credit-Information')

module.exports = (req, res) => {
    const key = req.query.key
    CreditInformation.findOneAndUpdate({creditKey: key}, {$set:{verified:true}}, function(err, doc){
       if(err){
           console.log("Something wrong when updating data!");
       } else {
           res.json(doc)
       }  
   });
}