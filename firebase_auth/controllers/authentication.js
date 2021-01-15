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
    const {body, status} = await authenticationService.register(username, password);

    return response.status(status).json(body);
}

const registerConfirmSchema = Joi.object({
    code: Joi.string()
})
async function registerConfirm(request, response){
    const validationResult = registerConfirmSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }
    const {code} = validationResult.value;
    const {body, status} = await authenticationService.registerConfirm(code);
    return response.status(status).json(body);
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
    const {body, status} = await authenticationService.login(username, password);

    return response.status(status).json(body);
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
    const {body, status} = await authenticationService.changePassword(username, previousPassword, proposedPassword);

    return response.status(status).json(body);
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
    const {body, status} = await authenticationService.forgotPassword(email);

    return response.status(status).json(body);
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
    const {body, status} = await authenticationService.forgotPasswordConfirm(confirmationCode, newPassword);

    return response.status(status).json(body);
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
    const {body, status} = await authenticationService.register(email);
    return response.status(status).json(body);
}

module.exports = {
    register: controllerWrapper(register),
    registerConfirm: controllerWrapper(registerConfirm),
    login: controllerWrapper(login),
    changePassword: controllerWrapper(changePassword),
    forgotPassword: controllerWrapper(forgotPassword),
    forgotPasswordConfirm: controllerWrapper(forgotPasswordConfirm),
    deleteAccount: controllerWrapper(deleteAccount),
}