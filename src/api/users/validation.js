const Joi = require('@hapi/joi');

module.exports.user = Joi.object({
    username: Joi.string().pattern(/^[a-zA-Z0-9\-]{3,100}$/)
        .required(),
    firstName: Joi.string()
        .min(3)
        .max(100)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(100)
        .required(),
    password: Joi.string()
        .min(3)
        .max(100)
        .required(),
    repeatPassword: Joi.ref('password'),
});

module.exports.loginUser = Joi.object({
    username: Joi.string().pattern(/^[a-zA-Z0-9\-]{3,100}$/)
        .required(),
    password: Joi.string()
        .min(3)
        .max(100)
        .required()
});

