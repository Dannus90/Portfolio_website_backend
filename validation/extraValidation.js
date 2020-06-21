//Validation
const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
    console.log("Got here!");
    const schema = Joi.object({
        fullName: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().min(8).required(),
    });
    return schema.validate(data);
};
//Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
};
