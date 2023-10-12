const express = require('express');
const router = express.Router();
const userRouter = require('./user.js');
const articleRouter = require('./article.js')

router.use(userRouter);
router.use(articleRouter);

module.exports = router;
