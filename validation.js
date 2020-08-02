// validation
const Joi = require('@hapi/joi');


// const registerValidation = async (data) => {
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    // return schema.validateAsync(data);
    return schema.validateAsync(data);
}

const loginValidation = async data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return await Promise.all([schema.validateAsync(data)]);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;