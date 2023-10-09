require('./db/dbConnect.js');
const router = require('./router/index.js');
const express = require('express');
const path = require('path');
const session = require('express-session');

//const test = require('./controller/user.js');
//const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//const Models = require('./db/Models.js');

const app = express();
const port = 3000;

app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'html');

app.use(session({
    secret: 'ede31adb-0bfb-442e-b091-011270eefd17',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge:1000*60
    }
}))

app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log('server start')
})