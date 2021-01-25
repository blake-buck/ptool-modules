const Joi = require('joi');
const dependencyInjector = require('../dependency-injector.js');
const authenticationService = dependencyInjector.inject('authenticationService');
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
    previousPassword: passwordSchema,
    proposedPassword: passwordSchema
});
async function changePassword(request, response){
    const headerValidation = requestHeadersWithJwtSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(validationResult.error);
    }
    const {jwt} = headerValidation.value;

    const validationResult = changePasswordSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error)
    }
    const {previousPassword, proposedPassword} = validationResult.value;
    const {body, status} = await authenticationService.changePassword(previousPassword, proposedPassword, jwt);

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

async function deleteAccount(request, response){
    const validationResult = requestHeadersWithJwtSchema.validate(request.headers);
    if(validationResult.error){
        throw new Error(validationResult.error)
    }
    const {jwt} = validationResult.value;
    const {body, status} = await authenticationService.deleteAccount(jwt);
    return response.status(status).json(body);
}

module.exports = {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    changePassword: controllerWrapper(changePassword),
    forgotPassword: controllerWrapper(forgotPassword),
    deleteAccount: controllerWrapper(deleteAccount),
}