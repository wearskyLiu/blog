const Models = require('../db/Models.js');
const crypto = require('../util/crypto.js');
const jwt = require('../util/jwt.js');

module.exports.register = async (req, res) => {
    try {
        // console.log(req.body);
        req.body.password = crypto(req.body.password, 'md5');
        let newUser = new Models.registerModel(req.body);
        await newUser.save();
        req.session.userInfor = { id: newUser._id.toString() };

        res.status(201).json(
            { id: newUser._id.toString() }
        )
    } catch (err) {
        res.status(500).json({ value: "false" });
    }
}

module.exports.login = async (req, res) => {
    try {
        let user = await Models.registerModel.findOne({ email: req.body.email });
        if (user) {
            req.body.password = crypto(req.body.password, 'md5');
            if (req.body.password === user.password) {
                let jwtCode = jwt.sign({ id: user._id.toString() })
                return res.status(200).json({ id: user._id.toString(), authorization: jwtCode })
            }
            return res.status(404).json({ value: "email or pswd error" });
        }
        res.status(404).json({ value: "email or pswd error" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ value: err });
    }
}
