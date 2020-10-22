const jwt = require('jsonwebtoken');
const tokens = require('../../database/tokens');
const config = require('../config');
const token = config.token;

module.exports = function (server) {

    server.get('/user', function (req, res, next) {
        /*
            Vérifie la présence du token d'accès.
         */
        if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
            res.status(401).send({
                success: false,
                message: 'missing access token'
            });
        } else {
            res.locals.token = req.headers.authorization.split(' ')[1];
            return next();
        }
    }, async function (req, res) {
        /*
              Vérifie la validité du token d'accès.
         */
        jwt.verify(res.locals.token, token.secret, async function(err) {
            if (err) {
                res.status(401).send({
                    success: false,
                    message: 'invalid access token'
                });
            } else {
                const object = await tokens.getAccessToken(res.locals.token);
                if (!object) {
                    res.status(401).send({
                        success: false,
                        message: 'invalid access token'
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        client_id: object.client_id,
                        user_id: object.user_id
                    });
                }
            }
        });
    });
}
