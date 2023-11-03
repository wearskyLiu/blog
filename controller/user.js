const Models = require('../db/Models.js');
const crypto = require('../util/crypto.js');
//const jwt = require('../util/jwt.js');

module.exports.register = async (req, res) => {
    try {
        // console.log(req.body);
        req.body.password = crypto(req.body.password, 'md5');
        let newUser = new Models.registerModel(req.body);
        await newUser.save();
        req.session.userInfor = { id: newUser._id.toString() };

        res.status(200).json(
            { id: newUser._id.toString() }
        )
    } catch (err) {
        res.status(500).json({ value: 'err' });
    }
}

module.exports.login = async (req, res) => {
    try {
        let user = await Models.registerModel.findOne({ email: req.body.email }).exec();
        if (user) {
            req.body.password = crypto(req.body.password, 'md5');
            if (req.body.password === user.password) {
                //let jwtCode = jwt.sign({ id: user._id.toString() })
                //return res.status(200).json({ id: user._id.toString(), authorization: jwtCode })
                req.session.userInfor = { id: user._id.toString() };
                return res.status(200).json({ id: user._id.toString() })
            }
            return res.status(401).json({ value: "email or pswd error" });
        }
        res.status(404).json({ value: "user not found" });
    } catch (err) {
        //console.log(err)
        res.status(500).json({ value: 'err' });
    }
}
