
    const controllerWrapper = require('./controllerWrapper.js');
    const Joi = require('joi');

    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupToUserService = dependencyInjector.inject('permissionGroupToUserService');

    const validQueryKeys = 'id,userId,groupId'.split(',');

    const specificParametersSchema = Joi.object({
        id: Joi.number().integer().required()
    })

    const getPermissionGroupToUsersSchema = Joi
        .object({
            limit: Joi.number().default(10),
            offset: Joi.number().default(0),
            fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,userId,groupId')
        })
        .pattern(
            Joi.alternatives().try(...validQueryKeys), 
            Joi.alternatives().try(
                Joi.string(), 
                Joi.number(), 
                Joi.boolean(),
                Joi.object({
                    lt: Joi.alternatives().try(Joi.string(), Joi.number()),
                    gt: Joi.alternatives().try(Joi.string(), Joi.number()),
                    lte: Joi.alternatives().try(Joi.string(), Joi.number()),
                    gte: Joi.alternatives().try(Joi.string(), Joi.number()),
                    ne: Joi.alternatives().try(Joi.string(), Joi.number()),
                    like: Joi.string(),
                    in: Joi.alternatives().try(Joi.string().pattern(/^(d|d,)+$/), Joi.string().pattern(/^[\w+,*]+$/i), Joi.object({like: Joi.string()})),
                })
            )
        );

    async function getPermissionGroupToUsers(request, response){
        const validationResult = getPermissionGroupToUsersSchema.validate(request.query);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToUserService.getPermissionGroupToUsers(validationResult);
        return response.status(result.status).json(result.body);
    }

    const getSpecificPermissionGroupToUserSchema = Joi.object({
        fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,userId,groupId')
    })
    async function getSpecificPermissionGroupToUser(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }
        const validationResult = getSpecificPermissionGroupToUserSchema.validate(request.query);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const fieldData = validationResult.value.fields;

        const result = await permissionGroupToUserService.getSpecificPermissionGroupToUser(request.params.id, fieldData);
        return response.status(result.status).json(result.body);
    }

    const postPermissionGroupToUserSchema = Joi.object({userId:Joi.string().required(),groupId:Joi.number().integer().required()})
    async function postPermissionGroupToUser(request, response){
        const validationResult = postPermissionGroupToUserSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToUserService.postPermissionGroupToUser(request.body);
        return response.status(result.status).json(result.body);
    }

    const updatePermissionGroupToUsersSchema = Joi.array().items({id:Joi.number().integer().required(),userId:Joi.string().required(),groupId:Joi.number().integer().required()}) 
    async function updatePermissionGroupToUsers(request, response){
        const validationResult = updatePermissionGroupToUsersSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToUserService.updatePermissionGroupToUsers(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateSpecificPermissionGroupToUserSchema = Joi.object({id:Joi.number().integer().required(),userId:Joi.string().required(),groupId:Joi.number().integer().required()})
    async function updateSpecificPermissionGroupToUser(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const validationResult = updateSpecificPermissionGroupToUserSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToUserService.updateSpecificPermissionGroupToUser(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchPermissionGroupToUsersSchema = Joi.array().items({id:Joi.number().integer().required(),userId:Joi.string(),groupId:Joi.number().integer()}) 
    async function patchPermissionGroupToUsers(request, response){
        const validationResult = patchPermissionGroupToUsersSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToUserService.patchPermissionGroupToUsers(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchSpecificPermissionGroupToUserSchema = Joi.object({userId:Joi.string(),groupId:Joi.number().integer()})
    async function patchSpecificPermissionGroupToUser(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const validationResult = patchSpecificPermissionGroupToUserSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToUserService.patchSpecificPermissionGroupToUser(request.params.id, request.body);
        return response.status(result.status).json(result.body);
    }

    const deletePermissionGroupToUsersSchema = Joi.array().items(Joi.number());
    async function deletePermissionGroupToUsers(request, response){
        const validationResult = deletePermissionGroupToUsersSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToUserService.deletePermissionGroupToUsers(request.body);
        return response.status(result.status).json(result.body);
    }

    async function deleteSpecificPermissionGroupToUser(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const result = await permissionGroupToUserService.deleteSpecificPermissionGroupToUser(headerValidation.value.id);
        return response.status(result.status).json(result.body);
    }

    module.exports = {
        getPermissionGroupToUsers: controllerWrapper(getPermissionGroupToUsers),
        getSpecificPermissionGroupToUser: controllerWrapper(getSpecificPermissionGroupToUser),
        postPermissionGroupToUser: controllerWrapper(postPermissionGroupToUser),
        updatePermissionGroupToUsers: controllerWrapper(updatePermissionGroupToUsers),
        updateSpecificPermissionGroupToUser: controllerWrapper(updateSpecificPermissionGroupToUser),
        patchPermissionGroupToUsers: controllerWrapper(patchPermissionGroupToUsers),
        patchSpecificPermissionGroupToUser: controllerWrapper(patchSpecificPermissionGroupToUser),
        deletePermissionGroupToUsers: controllerWrapper(deletePermissionGroupToUsers),
        deleteSpecificPermissionGroupToUser: controllerWrapper(deleteSpecificPermissionGroupToUser)
    }
    