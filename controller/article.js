const Models = require('../db/Models.js');

module.exports.createArticle = async (req, res) => {
    try {
        console.log(req.subject);
        console.log(req.body);
        res.status(201)
    } catch (error) {

    }
}