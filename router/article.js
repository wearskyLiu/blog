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

router.get('/article/:articleId', async (req, res) => {
    try {
        let article = await Models.articleModel.findById(req.params.articleId).exec();
        if (article) {
            return res.render('articleDetails.html', { subject: article.subject, body: article.body })
        }
    } catch (error) {
        res.status(500).json({ value: 'err' });
    }

})

router.get('/home/page/:id', async (req, res) => {
    try {
        let page = (parseInt(req.params.id) - 1) * 10;
        let articles = await Models.articleModel.find().sort('-createdDate').limit(10).skip(page).exec();
        let count = await Models.articleModel.find().count();

        if (articles.length > 0) {
            if (parseInt(req.params.id) > 6) {
                return res.render('home2', { article: articles, page: Array.from(Array(parseInt(req.params.id)).keys(), n => n + 1).slice(-6), current: req.params.id })
            }
            console.log(Array.from(Array(parseInt(req.params.id)).keys(), n => n + 1))
            return res.render('home2', { article: articles, page: Array.from(Array(Math.ceil(count / 10)).keys(), n => n + 1), current: req.params.id })
        }
    } catch (error) {
        res.status(500).send('err');
    }
})

router.get('/home', async (req, res) => {
    let articles = await Models.articleModel.find().sort('-createdDate').limit(10).skip(0).exec();
    let count = await Models.articleModel.find().count();
    console.log(Math.ceil(count / 10));
    console.log(Array.from(Array(Math.ceil(count / 10)).keys(), n => n + 1))

    if (Math.ceil(count / 10) > 6) {

        return res.render('home', { article: articles, page: [1, 2, 3, 4, 5, 6] })
    }

    return res.render('home', { article: articles, page: Array.from(Array(Math.ceil(count / 10)).keys(), n => n + 1) })
})

module.exports = router;