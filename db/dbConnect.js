const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blog');
mongoose.connection.once("open", () => {
    console.log('db connected successfully')
}
)