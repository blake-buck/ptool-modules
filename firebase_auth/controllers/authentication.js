const Joi = require('joi');
const authenticationService = require('../services/authentication');
const logger = require('../logger');
const controllerWrapper = require('./controllerWrapper');


const requestHeadersSchema = Joi.object().pattern(
    Joi.string(), 
    Joi.alternatives().try(
        Joi.string(), 
        Joi.number(),
        Joi.boolean()
    )
);

const requestHeadersWithJwtSchema = Joi.object({
    jwt: Joi.string().required()
}).pattern(
    Joi.string(), 
    Joi.alternatives().try(
        Joi.string(), 
        Joi.number(), 
        Joi.boolean()
    )
);

const usernameSchema = Joi.string().email().required();

const passwordSchema = Joi.string()
    .min(10).max(256)
    .pattern(/[!@#$%^&*()]/).pattern(/[A-Z]/).pattern(/[a-z]/).pattern(/[0-9]/)
    .required();



const registerSchema = Joi.object({
    username: usernameSchema,
    password: passwordSchema
});
async function register(request, response){
    const validationResult = registerSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }
    const {username, password} = validationResult.value;
    const {result, status} = await authenticationService.register(username, password);

    return result.status(status).json(result);
}

const loginSchema = Joi.object({
    username: usernameSchema,
    password: passwordSchema
});
async function login(request, response){
    const validationResult = loginSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }
    const {username, password} = validationResult.value;
    const {result, status} = await authenticationService.login(username, password);

    return result.status(status).json(result);
}

const changePasswordSchema = Joi.object({
    username: usernameSchema,
    previousPassword: passwordSchema,
    proposedPassword: passwordSchema
});
async function changePassword(request, response){
    const validationResult = changePasswordSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error)
    }
    const {username, previousPassword, proposedPassword} = validationResult.value;
    const {result, status} = await authenticationService.changePassword(username, previousPassword, proposedPassword);

    return result.status(status).json(result);
}

const forgotPasswordSchema = Joi.object({
    email:usernameSchema
});
async function forgotPassword(request, response){
    const validationResult = forgotPasswordSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error)
    }
    const {email} = validationResult.value;
    const {result, status} = await authenticationService.forgotPassword(email);

    return result.status(status).json(result);
}

const forgotPasswordConfirmSchema = Joi.object({
    confirmationCode: Joi.string(),
    newPassword: passwordSchema
});
async function forgotPasswordConfirm(request, response){
    const validationResult = forgotPasswordConfirmSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error)
    }
    const {confirmationCode, newPassword} = validationResult.value;
    const {result, status} = await authenticationService.forgotPasswordConfirm(confirmationCode, newPassword);

    return result.status(status).json(result);
}

const deleteAccountSchema = Joi.object({
    email: usernameSchema
});
async function deleteAccount(request, response){
    const validationResult = deleteAccountSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error)
    }
    const {email} = validationResult.value;
    const {result, status} = await authenticationService.register(email);
    return result.status(status).json(result);
}

module.exports = {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    changePassword: controllerWrapper(changePassword),
    forgotPassword: controllerWrapper(forgotPassword),
    forgotPasswordConfirm: controllerWrapper(forgotPasswordConfirm),
    deleteAccount: controllerWrapper(deleteAccount),
}