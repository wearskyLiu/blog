const express = require('express');
const router = express.Router();
const articleAPI = require('../controller/article');
const Models = require('../db/Models.js');

router.get('/createArticle', async (req, res) => {
    try {
        let user = await Models.registerModel.findById(req.session.userInfor.id).exec();
        if (user) {
            return res.render('createArticle.html')
        }
        res.status(403).send('please log in');
    } catch (error) {
        res.status(500).json({ value: 'err' });
    }

})

router.post('/createArticle', articleAPI.createArticle)

module.exports = router;