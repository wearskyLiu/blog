var jwt = require('jsonwebtoken');

module.exports.sign = (payload) => {
    return jwt.sign(payload, '120d2c74-5da0-4f73-a0b5-f2e0bd2c72f4', { expiresIn: 10 });
}

