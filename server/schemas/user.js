const validation = require('yup');

const schema = validation.object().shape({
    email: validation.string().email().required(),
    password: validation.string().required()
})

module.exports = schema;