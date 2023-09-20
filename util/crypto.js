const crypto = require('crypto');
module.exports = function (text, hashtype) {

    return crypto.createHash(hashtype).update('1fd32c7a-5c43-41cc-917e-d3b4701e5694' + text).digest("hex");
}
