const validation = require('yup');

const schema = validation.object().shape({
    client_id: validation.string().required(),
    client_secret: validation.string().required(),
    grant_type: validation.string().required(),
    authorization_code: validation.string().nullable(),
    refresh_token: validation.string().nullable()
});

module.exports = schema;