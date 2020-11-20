const bcrypt = require('bcrypt');
const users = require('../../database/users');
const clients = require('../../database/clients');
const codes = require('../../database/codes');
const { v4: uuid } = require('uuid');
const schema = require('../schemas/authorization');

const config = require('../config');
const expiry = config.token.access.expiry;

module.exports = function (server) {

    server.post('/authorization', function (req, res, next) {
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
    }, function (req, res, next) {
        /*
            Vérifie le type d'attribution du token.
        */
        const { request } = req.body;
        if (request.grant_type !== 'authorization_code') {
            res.status(400).send({
                success: false,
                message: 'invalid grant type'
            });
        } else {
            return next();
        }
    }, function (req, res, next) {
        /*
            Vérifie le type de réponse.
        */
        const { request } = req.body;
        if (request.response_type !== 'code') {
            res.status(400).send({
                success: false,
                message: 'invalid response type'
            });
        } else {
            return next();
        }
    }, async function (req, res, next) {
        /*
            Vérifie les informations de l'utilisateur.
        */
        const { user } = req.body;
        const object = await users.getByEmail(user.email);
        if (!object) {
            res.status(400).send({
                success: false,
                message: 'invalid user'
            });
        } else {
            res.locals.user_id = object._id;
            bcrypt.compare(user.password, object.password, function (err) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: 'invalid password'
                    });
                } else {
                    return next();
                }
            });
        }
    }, async function (req, res, next) {
        /*
           Vérifie les informations du client et l'uri de redirection.
       */
        const { request } = req.body;
        const object = await clients.get(request.client_id);
        if (!object) {
            res.status(400).send({
                success: false,
                message: 'invalid client'
            });
        } else {
            if (!object.redirect_uris.includes(request.redirect_uri)) {
                res.status(400).send({
                    success: false,
                    message: 'redirect uri not allowed'
                });
            } else {
                res.locals.client_id = object._id;
                return next();
            }
        }
    }, async function (req, res) {
        /*
           Génére le code d'autorisation.
       */
        const { request } = req.body;
        let date = new Date();
        date.setSeconds(date.getSeconds() + expiry);

        const object = await codes.save({
            authorization_code: uuid(),
            expires_at: date,
            redirect_uri: request.redirect_uri,
            scope: 'access',
        }, res.locals.client_id, res.locals.user_id);

        if(object) {
            res.status(201).send({
                success: true,
                redirect_uri: object.redirect_uri,
                authorization_code: object.authorization_code,
                state: request.state
            });
        }
    });

}
