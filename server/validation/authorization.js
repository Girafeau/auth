const validation = require('yup');

const schema = validation.object().shape({
    user: validation.object().shape({
        email: validation.string().email().required(),
        password: validation.string().required()
    }),
    request: validation.object().shape({
        client_id: validation.string().required(),
        redirect_uri: validation.string().url().required(),
        response_type: validation.string().required(),
        grant_type: validation.string().required(),
        state: validation.string().required()
    })
});

module.exports = schema;