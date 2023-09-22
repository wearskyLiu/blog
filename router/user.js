const express = require('express');
const validate = require('../Middleware/Validate.js');
const { body } = require('express-validator');
const Models = require('../db/Models.js');
const router = express.Router();
const userAPI = require('../controller/user.js');

router.post('/register',
    validate(
        [
            body('email').notEmpty().withMessage('The email parameter cannot be empty').isEmail().withMessage('Invalid email format'),
            body('username').notEmpty().withMessage('The username parameter cannot be empty').isLength({ min: 6, max: 16 }).withMessage('username: min:6, max16'),
            body('password').notEmpty().withMessage('The pswd parameter cannot be empty').isLength({ min: 6, max: 16 }).withMessage('pswd: min:6, max16')
        ]),
    validate(
        [
            body('email').custom(async (email, { req }) => {
                let emails = await Models.registerModel.findOne({ $or: [{ email }, { username: req.body.username }] });
                if (emails) {
                    return Promise.reject('This email/username has been registered.')
                }

            })
        ]),
    userAPI.register
)

router.post('/login',
    validate(
        [
            body('email').notEmpty().withMessage('The email parameter cannot be empty').isEmail().withMessage('Invalid email format'),
            body('password').notEmpty().withMessage('The pswd parameter cannot be empty').isLength({ min: 6, max: 16 }).withMessage('pswd: min:6, max16')
        ]),
    userAPI.login
)

router.get('/login',(req,res)=>{
    res.render('login.html')
})

router.get('/register',(req,res)=>{
    res.render('register.html')
})

module.exports = router;