const express = require('express');
const router = express.Router();

router.get('/createArticle', (req, res) => {
    res.render('createArticle.html')
})

module.exports = router;