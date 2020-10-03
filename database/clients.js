const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.model('clients', new Schema({
    client_id: {type: String},
    client_secret: { type: String },
    domain: { type: String },
    redirect_uris: { type: Array }
}));

const clients = mongoose.model('clients');

module.exports.get = function(id, secret) {
    return clients.find({ client_id: id, client_secret: secret });
};

module.exports.get = function(id) {
    return clients.findOne({ client_id: id });
};

module.exports.getDomains = function() {
    return clients.find({}, {domain: 1, _id: 0});
};
