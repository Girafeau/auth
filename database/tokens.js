const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.model('tokens', new Schema({
    access_token: { type: String },
    access_token_expires_at: { type: Date },
    client_id: { type: String },
    refresh_token: { type: String },
    refresh_token_expires_at: { type: Date },
    user_id: { type: String },
}));

const tokens = mongoose.model('tokens');

module.exports.getAccessToken = function(token) {
    return tokens.findOne({ access_token: token }).lean();
};

module.exports.getRefreshToken = function(token) {
    return tokens.findOne({ refresh_token: token }).lean();
};

module.exports.save = function(token, client_id, user_id) {
    const entry = new tokens({
        access_token: token.access_token,
        access_token_expires_at: token.access_token_expires_at,
        client_id: client_id,
        refresh_token: token.refresh_token,
        refresh_token_expires_at: token.refresh_token_expires_at,
        user_id: user_id,
    });

    return entry.save();
};