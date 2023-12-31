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

/* router.get('/article/:articleId', async (req, res) => {
    try {
        let article = await Models.articleModel.findById(req.params.articleId).exec();
        if (article) {
            return res.render('articleDetails.html', { subject: article.subject, body: article.body })
        }
    } catch (error) {
        res.status(500).json({ value: 'err' });
    }

}) */

router.get('/home/page/:id', async (req, res) => {
    try {
        let page = (parseInt(req.params.id) - 1) * 10;
        let articles = await Models.articleModel.find().sort('-createdDate').limit(10).skip(page).exec();
        let count = await Models.articleModel.find().count();
        //console.log(req.session.userInfor)

        if (articles.length > 0) {
            if (parseInt(req.params.id) > 6) {
                return res.render('home', { article: articles, page: Array.from(Array(parseInt(req.params.id)).keys(), n => n + 1).slice(-6), current: req.params.id, mode: 1, auth: req.session.userInfor === undefined ? 0 : 1 })
            }
            //console.log(Array.from(Array(parseInt(req.params.id)).keys(), n => n + 1))
            return res.render('home', { article: articles, page: Array.from(Array(Math.ceil(count / 10)).keys(), n => n + 1), current: req.params.id, mode: 1, auth: req.session.userInfor === undefined ? 0 : 1 })
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/home', async (req, res) => {
    let articles = await Models.articleModel.find({}, '_id subject  createdDate').sort('-createdDate').limit(10).skip(0).exec();
    // console.log(articles)
    articles = articles.map((item) => {
        return { id: item._id.toString(), subject: item.subject, createdDate: item.createdDate }
    })
    let count = await Models.articleModel.find().count();
    //console.log(Math.ceil(count / 10));
    //console.log(Array.from(Array(Math.ceil(count / 10)).keys(), n => n + 1))

    if (Math.ceil(count / 10) > 6) {

        return res.render('home', { article: articles, page: [1, 2, 3, 4, 5, 6], mode: 0, auth: req.session.userInfor === undefined ? 0 : 1 })
    }

    return res.render('home', { article: articles, page: Array.from(Array(Math.ceil(count / 10)).keys(), n => n + 1), mode: 0, auth: req.session.userInfor === undefined ? 0 : 1 })
})

router.get('/articleDetail/:id', async (req, res) => {
    let article = await Models.articleModel.findById(req.params.id).exec();
    let user = await Models.registerModel.findById(article.createdBy,).exec();
    //console.log(article);
    res.render('articleDetails', { details: article, username: user.username });
})

module.exports = router;