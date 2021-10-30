const joi = require('joi');

const ValidationLogIn = joi.object({
    email: joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'co'] },
        }),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

module.exports = ValidationLogIn;