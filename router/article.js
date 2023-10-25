const express = require('express');
const router = express.Router();
const articleAPI = require('../controller/article');

router.get('/createArticle', (req, res) => {
    res.render('createArticle.html')
})

router.post('/createArticle', articleAPI.createArticle)

module.exports = router;