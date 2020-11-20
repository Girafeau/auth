const users = require('../../database/users');
const secure = require('../secure');
const schema = require('../schemas/user');
const bcrypt = require('bcrypt');
const salt = 10;

module.exports = function (server) {

    server.get('/user/:id', secure, async function (req, res) {
        const object = await users.get(res.locals.token.user_id);
        if(!object) {
            res.status(404).send({
                success: false,
                message: "no user"
            });
        } else {
            if(req.params.id !== res.locals.token.user_id) {
                res.status(403).send({
                    success: false,
                    message: "unallowed to access user"
                });
            }  else {
                res.status(200).send({
                    success: true,
                    user: object
                });
            }
        }
    });


    server.post('/user', function(req, res, next) {
        /*
           Vérifie les paramètres de la requête.
       */
        schema.isValid(req.body).then(function (valid) {
            if (!valid) {
                res.status(400).send({
                    success: false,
                    message: 'missing or invalid parameters'
                });
            } else {
                return next();
            }
        });
    }, async function(req, res, next) {
        /*
            Vérifie que l'adresse e-mail n'est pas utilisée.
        */
        const { email } = req.body;
        const object = await users.getByEmail(email);
        if(object) {
            res.status(400).send({
                success: false,
                message: 'already existing email'
            });
        } else {
            return next();
        }
    }, async function (req, res) {
        /*
        * Sauvegarde l'utilisateur.
        */
        const {password, email} = req.body;
        bcrypt.hash(password, salt, async function(err, hash) {
            const user = {
                email: email,
                password: hash
            };
            const object = await users.save(user);
            if(object) {
                res.status(201).send({
                    success: true,
                    message: 'user created'
                });
            }

        });
    });
}
