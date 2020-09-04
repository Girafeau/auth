const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const tokens = require('../database/tokens');

module.exports = function(server) {
    server.get('/request/secure', function(req, res, next) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            res.locals.token = req.headers.authorization.split(' ')[1];
            return next();
        } else {
            res.status(401).send({
                succes: false,
                message: 'missing token'
            });
        }
    }, async function(req, res, next) {
      const object = await tokens.getAccessToken(res.locals.token);
      if(object) {
        res.status(200).send({
            succes: true,
            client_id: object.client_id,
            user_id: object.user_id
        });
      } else {
        res.status(401).send({
            succes: false,
            message: 'invalid token'
        });
      }

    });
}
