module.exports = (req, res) => {
    // Response with all information about credit
    CreditInformation.find({creditKey: hash})
    .then(response => res.json(response))
}