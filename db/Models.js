const mongoose = require('mongoose');

let registerSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        username: { type: String, required: true },
        createdDate: { type: Date, default: Date.now, required: true }
    }
)

let articleSchema = new mongoose.Schema(
    {
        subject: { type: String, required: true },
        body: { type: String, required: true },
        createdDate: { type: Date, default: Date.now, required: true },
        createdBy: { type: String, required: true }
    }
)

let registerModel = mongoose.model("register", registerSchema);
let articleModel = mongoose.model("article", articleSchema)

module.exports = { registerModel, articleModel };