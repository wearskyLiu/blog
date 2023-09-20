const mongoose = require('mongoose');

let registerSchema = new mongoose.Schema(
    {
        email:{type:String,required: true},
        password:{type:String,required: true},
        username:{type:String,required: true}
    }
)

let registerModel = mongoose.model("register",registerSchema)

module.exports = {registerModel};