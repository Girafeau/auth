const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.model('codes', new Schema({
    authorization_code: { type: String },
    expires_at: { type: Date },
    redirect_uri: { type: String },
    scope: { type: String },
    client_id: { type: String },
    user_id:  { type: String }
}));

const codes = mongoose.model('codes');

module.exports.save = function(code, client_id, user_id) {
    const entry = new codes({
        authorization_code: code.authorization_code,
        expires_at: code.expires_at,
        redirect_uri: code.redirect_uri,
        scope: code.scope,
        client_id: client_id,
        user_id: user_id
    });

    return entry.save();
};

module.exports.revoke = function(code) {
    return codes.findOneAndDelete({ authorization_code: code});
};

module.exports.get = function(code) {
    return codes.findOne({ authorization_code: code});
};