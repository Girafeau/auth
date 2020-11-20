const clients = require('../../database/clients');
const codes = require('../../database/codes');
const tokens = require('../../database/tokens');
const before = require('date-fns/isBefore');
const jwt = require('jsonwebtoken');
const schema = require('../schemas/token');

const config = require('../config');
const token = config.token;

module.exports = function (server) {

    server.post('/token', function (req, res, next) {
        /*
            Vérifie les paramètres de la requête.
        */
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
    }, async function (req, res, next) {
        /*
            Vérifie les informations du client.
        */
        const { client_id, client_secret } = req.body;
        const object = await clients.getWithSecret(client_id, client_secret);
        if (!object) {
            res.status(400).send({
                success: false,
                message: 'invalid client'
            });
        } else {
            res.locals.client_id = object._id;
            return next();
        }
    }, async function (req, res) {
        /*
            Vérifie le type d'attribution du token.
        */
        const { grant_type } = req.body;
        if (grant_type !== 'authorization_code' && grant_type !== 'refresh_token') {
            res.status(400).send({
                success: false,
                message: 'invalid grant type'
            });
        } else if(grant_type === 'authorization_code') {
            /*
                Vérifie le code d'autorisation.
             */
            const { authorization_code } = req.body;
            const object = await codes.get(authorization_code);
            if (!object) {
                res.status(400).send({
                    success: false,
                    message: 'invalid authorization code'
                });
            } else {
                res.locals.client_id = object.client_id;
                if (!before(Date.now(), object.expires_at)) {
                    res.status(400).send({
                        success: false,
                        message: 'expired authorization code'
                    });
                } else {
                    /*
                        Supprime le code d'autorisation utilisé.
                    */
                    const {authorization_code} = req.body;
                    codes.revoke(authorization_code);

                    /*
                        Génére les tokens.
                     */
                    let access_token_date = new Date();
                    access_token_date.setSeconds(access_token_date.getSeconds() + token.access.expiry);

                    let refresh_token_date = new Date();
                    refresh_token_date.setSeconds(refresh_token_date.getSeconds() + token.refresh.expiry);

                    let access_token = jwt.sign({
                        client_id: res.locals.client_id,
                        user_id: res.locals.user_id
                    }, token.secret, { expiresIn: token.access.expiry });

                    let refresh_token = jwt.sign({
                        client_id: res.locals.client_id,
                        user_id: res.locals.user_id
                    }, token.secret, { expiresIn: token.refresh.expiry });

                    const object = await tokens.save({
                        access_token: access_token,
                        access_token_expires_at: access_token_date,
                        refresh_token: refresh_token,
                        refresh_token_expires_at: refresh_token_date,
                    }, res.locals.client_id, res.locals.user_id);

                    res.status(200).send({
                        success: true,
                        access_token: object.access_token,
                        refresh_token: object.refresh_token,
                        token_type: 'Bearer',
                        expires_in: token.access.expiry
                    });

                }
            }
        } else if(grant_type === 'refresh_token') {
            /*
               Vérifie le token.
            */
            const {refresh_token} = req.body;
            const object = await tokens.getRefreshToken(refresh_token);
            if (!object) {
                res.status(401).send({
                    success: false,
                    message: 'invalid refresh token'
                });
            } else {
                jwt.verify(refresh_token, token.secret, async function(err, decoded) {
                    if(err) {
                        res.status(401).send({
                            success: false,
                            message: 'invalid refresh token'
                        });
                    } else {
                        /*
                            Met à jour le token d'accès.
                         */
                        let access_token = jwt.sign({
                            client_id: decoded.client_id,
                            user_id: decoded.user_id
                        }, token.secret, { expiresIn: token.access.expiry });

                        tokens.update(refresh_token, access_token);

                        res.status(200).send({
                            success: true,
                            access_token: access_token,
                            token_type: 'Bearer',
                            expires_in: token.access.expiry
                        });

                    }
                });
            }
        }
    });
}




