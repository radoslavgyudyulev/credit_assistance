const CreditInformation = require('../models/Credit-Information')

module.exports = (req, res) => {
    const key = req.body.key
    const mail = req.body.email
    console.log(key)
    console.log(email)
    const data = {
        userData: {email: mail}
    }
    // if(!email && !key) {
    //     res.send('Invalid params')
    // }
    CreditInformation.findOneAndUpdate(data, {$set:{verified:true}}, function(err, doc){
       if(err){
           console.log("Something wrong when updating data!");
       } else {
           res.json(doc)
       }  
   });
}