module.exports = function secure(req, res, next) {
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
             /*
              Vérifie la validité du token d'accès.
         */
        jwt.verify(res.locals.token, token.secret, async function(err, decoded) {
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
                    res.locals.token = decoded;
                    return next();
                }
            }
        });
    }    
}
