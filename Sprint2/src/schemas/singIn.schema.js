const joi = require('joi');

const userValidation = joi.object({
    name: joi
        .string()
        .min(3)
        .max(30)
        .required(),
    email: joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'co'] },
        }),
    phone: joi.number()
        .greater(7),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: joi.ref('password'),
    isAdmin: joi.boolean(),
    isActive: joi.boolean()
});

module.exports = userValidation;
