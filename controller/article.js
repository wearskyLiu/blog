const Models = require('../db/Models.js');

module.exports.createArticle = async (req, res) => {
    try {
        let user = await Models.registerModel.findById(req.session.userInfor.id).exec();
        if (user) {
            let articleBody = { createdBy: req.session.userInfor.id, ...req.body };
            let newArticle = new Models.articleModel(articleBody);
            await newArticle.save();
            return res.status(201).json({ articleId: newArticle._id.toString() })
        }

        res.status(404).send('user not found');
    } catch (error) {
        res.status(500).json({ value: error });
    }
}