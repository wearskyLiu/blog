const express = require('express');
const router = express.Router();
const userRouter = require('./user.js');
const articleRouter = require('./article.js')
const file = require('./file.js');

router.use(userRouter);
router.use(articleRouter);
router.use(file);

module.exports = router;
