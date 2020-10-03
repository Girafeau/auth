const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const tokens = require('../database/tokens');

module.exports = function (server) {
    server.get('/request/secure', function (req, res, next) {
        if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
            res.status(401).send({
                success: false,
                message: 'missing token'
            });
        } else {
            res.locals.token = req.headers.authorization.split(' ')[1];
            return next();
        }
    }, async function (req, res, next) {
        const object = await tokens.getAccessToken(res.locals.token);
        if (!object) {
            res.status(401).send({
                success: false,
                message: 'invalid token'
            });
        } else {
            res.status(200).send({
                success: true,
                client_id: object.client_id,
                user_id: object.user_id
            });
        }

    });
}
