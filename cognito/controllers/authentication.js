const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const authenticationService = dependencyInjector.inject('authenticationService');
const logger = require('../logger');
const controllerWrapper = require('./controllerWrapper');

const {BadRequestError} = require('../constants/errors')

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

const ipSchema = Joi.string().required();

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
        logger.error(validationResult.error);
        throw new BadRequestError(validationResult.error);
    }

    const {username, password} = validationResult.value;

    const result = await authenticationService.register(username, password);

    return response.status(result.status).json(result.body);
}



const loginSchema = Joi.object({
    username: usernameSchema,
    password: passwordSchema
});
async function login(request, response){
    const headerValidation = requestHeadersSchema.validate(request.headers);
    if(headerValidation.error){
        logger.error(headerValidation.error);
        throw new BadRequestError(headerValidation.error);
    }

    const ipValidation = ipSchema.validate(request.ip);
    if(ipValidation.error){
        logger.error(ipValidation.error);
        throw new BadRequestError(ipValidation.error);
    }

    const bodyValidation = loginSchema.validate(request.body);
    if(bodyValidation.error){
        logger.error(bodyValidation.error);
        throw new BadRequestError(bodyValidation.error);
    }

    const {username, password} = bodyValidation.value;

    const result = await authenticationService.login(
        username, 
        password, 
        {ip: request.ip, headers: request.headers}
    );

    return response.status(result.status).json(result.body);
}



const refreshSchema = Joi.object({
    refresh: Joi.string().required()
});
async function refreshToken(request, response){
    const headerValidation = requestHeadersWithJwtSchema.validate(request.headers);
    if(headerValidation.error){
        logger.error(headerValidation.error);
        throw new BadRequestError(headerValidation.error);
    }

    const ipValidation = ipSchema.validate(request.ip);
    if(ipValidation.error){
        logger.error(ipValidation.error);
        throw new BadRequestError(ipValidation.error);
    }

    const bodyValidation = refreshSchema.validate(request.body);
    if(bodyValidation.error){
        logger.error(bodyValidation.error);
        throw new BadRequestError(bodyValidation.error);
    }

    const {refresh} = bodyValidation.value;

    const result = await authenticationService.refreshToken({refresh, headers: request.headers, ip: request.ip});
    return response.status(result.status).json(result.body);
}



const changePasswordSchema_body = Joi.object({
    previousPassword: passwordSchema,
    proposedPassword: passwordSchema
});
async function changePassword(request, response){
    const headersValidation = requestHeadersWithJwtSchema.validate(request.headers);
    if(headersValidation.error){
        logger.error(headersValidation.error);
        throw new BadRequestError(headersValidation.error);
    }

    const bodyValidation = changePasswordSchema_body.validate(request.body);
    if(bodyValidation.error){
        logger.error(bodyValidation.error);
        throw new BadRequestError(bodyValidation.error);
    }

    const {previousPassword, proposedPassword} = bodyValidation.value;

    const result = await authenticationService.changePassword({previousPassword, proposedPassword}, request.headers.jwt);
    return response.status(result.status).json(result.body);
}



const forgotPasswordSchema = Joi.object({
    username: usernameSchema
});
async function forgotPassword(request, response){
    const validationResult = forgotPasswordSchema.validate(request.body);
    if(validationResult.error){
        logger.error(validationResult.error);
        throw new BadRequestError(validationResult.error);
    }
    
    const {username} = validationResult.value;

    const result = await authenticationService.forgotPassword(username);
    return response.status(result.status).json(result.body);
}



const confirmForgotPasswordSchema = Joi.object({
    confirmationCode: Joi.string().required(),
    username: usernameSchema,
    password: passwordSchema
})
async function confirmForgotPassword(request, response){
    const validationResult = confirmForgotPasswordSchema.validate(request.body);
    if(validationResult.error){
        logger.error(validationResult.error);
        throw new BadRequestError(validationResult.error);
    }

    const {confirmationCode, username, password} = validationResult.value;

    const result = await authenticationService.confirmForgotPassword({
        confirmationCode,
        username,
        password
    });
    return response.status(result.status).json(result.body);
}



async function deleteAccount(request, response){
    const headersValidation = requestHeadersWithJwtSchema.validate(request.headers);
    if(headersValidation.error){
        logger.error(headersValidation.error);
        throw new BadRequestError(headersValidation.error);
    }

    const result = await authenticationService.deleteAccount(request.headers.jwt);
    return response.status(result.status).json(result.body);
}


module.exports = {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    refreshToken: controllerWrapper(refreshToken),
    changePassword: controllerWrapper(changePassword),
    forgotPassword: controllerWrapper(forgotPassword),
    confirmForgotPassword: controllerWrapper(confirmForgotPassword),
    deleteAccount: controllerWrapper(deleteAccount)
}