const clients = require('../database/clients');
const codes = require('../database/codes');
const tokens = require('../database/tokens');
const validation = require('yup');
const isBefore = require('date-fns/isBefore');
const addSeconds = require('date-fns/addSeconds');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiry = 60 * 60 * 24;

const schema = validation.object().shape({
    client_id: validation.string().required(),
    client_secret: validation.string().required(),
    grant_type: validation.string().required(),
    authorization_code: validation.string().required(),
});

module.exports = function(server) {

    server.post('/request/access', function (req, res, next) {
        schema.isValid(req.body).then(function (valid) {
            if (!valid) {
                res.status(400).send({
                    success: false,
                    message: 'missing parameters'
                });
            } else {
                return next();
            }
        });
    }, function (req, res, next) {
        const {grant_type} = req.body;
        if(grant_type !== 'authorization_code') {
            res.status(400).send({
                success: false,
                message: 'invalid grant type'
            });
        } else {
            return next();
        }
    }, async function (req, res, next) {
        const {client_id, client_secret} = req.body;
        const object = await clients.get(client_id, client_secret); // Problème ici à régler
        if (!object) {
            res.status(400).send({
                success: false,
                message: 'invalid client'
            });
        } else {
            res.locals.client_id = object._id;
            return next();
        }
    }, async function (req, res, next) {
        const {authorization_code} = req.body;
        const object = await codes.get(authorization_code);
        if (!object) {
            res.status(400).send({
                success: false,
                message: 'invalid authorization code'
            });
        } else {
            res.locals.user_id = object.user_id;
            res.locals.client_id = object.client_id;
            if (!isBefore(new Date(), object.expires_at)) {
                res.status(400).send({
                    success: false,
                    message: 'expired authorization code'
                });
            } else {
                return next();
            }
        }
    }, async function (req, res, next) {
        const {authorization_code} = req.body;
        const object = await codes.revoke(authorization_code);
        if (object) {
            return next();
        }
    }, async function (req, res)  {
        const {authorization_code} = req.body;
        const token = jwt.sign({
            client_id: res.locals.client_id,
            user_id: res.locals.user_id,
            authorization_code: authorization_code
        }, secret, {expiresIn: expiry});
        const object = await tokens.save({
            access_token: token,
            access_token_expires_at: addSeconds(new Date(), expiry),
            refresh_token: null,
            refresh_token_expires_at: null,
        }, res.locals.client_id, res.locals.user_id);
        if(object) {
            res.status(200).send({
                access_token: object.access_token,
                token_type: 'Bearer',
                expires_in: expiry
            });
        }
    });

}
