
    const controllerWrapper = require('./controllerWrapper.js');
    const Joi = require('joi');

    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupService = dependencyInjector.inject('permissionGroupService');

    const validQueryKeys = 'id,name,description'.split(',');

    const specificParametersSchema = Joi.object({
        id: Joi.number().integer().required()
    })

    const getPermissionGroupsSchema = Joi
        .object({
            limit: Joi.number().default(10),
            offset: Joi.number().default(0),
            fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,name,description')
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

    async function getPermissionGroups(request, response){
        const validationResult = getPermissionGroupsSchema.validate(request.query);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupService.getPermissionGroups(validationResult);
        return response.status(result.status).json(result.body);
    }

    const getSpecificPermissionGroupSchema = Joi.object({
        fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,name,description')
    })
    async function getSpecificPermissionGroup(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }
        const validationResult = getSpecificPermissionGroupSchema.validate(request.query);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const fieldData = validationResult.value.fields;

        const result = await permissionGroupService.getSpecificPermissionGroup(request.params.id, fieldData);
        return response.status(result.status).json(result.body);
    }

    const postPermissionGroupSchema = Joi.object({name:Joi.string().required(),description:Joi.string().required()})
    async function postPermissionGroup(request, response){
        const validationResult = postPermissionGroupSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupService.postPermissionGroup(request.body);
        return response.status(result.status).json(result.body);
    }

    const updatePermissionGroupsSchema = Joi.array().items({id:Joi.number().integer().required(),name:Joi.string().required(),description:Joi.string().required()}) 
    async function updatePermissionGroups(request, response){
        const validationResult = updatePermissionGroupsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupService.updatePermissionGroups(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateSpecificPermissionGroupSchema = Joi.object({id:Joi.number().integer().required(),name:Joi.string().required(),description:Joi.string().required()})
    async function updateSpecificPermissionGroup(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const validationResult = updateSpecificPermissionGroupSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupService.updateSpecificPermissionGroup(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchPermissionGroupsSchema = Joi.array().items({id:Joi.number().integer().required(),name:Joi.string(),description:Joi.string()}) 
    async function patchPermissionGroups(request, response){
        const validationResult = patchPermissionGroupsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupService.patchPermissionGroups(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchSpecificPermissionGroupSchema = Joi.object({name:Joi.string(),description:Joi.string()})
    async function patchSpecificPermissionGroup(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const validationResult = patchSpecificPermissionGroupSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupService.patchSpecificPermissionGroup(request.params.id, request.body);
        return response.status(result.status).json(result.body);
    }

    const deletePermissionGroupsSchema = Joi.array().items(Joi.number());
    async function deletePermissionGroups(request, response){
        const validationResult = deletePermissionGroupsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupService.deletePermissionGroups(request.body);
        return response.status(result.status).json(result.body);
    }

    async function deleteSpecificPermissionGroup(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const result = await permissionGroupService.deleteSpecificPermissionGroup(headerValidation.value.id);
        return response.status(result.status).json(result.body);
    }

    module.exports = {
        getPermissionGroups: controllerWrapper(getPermissionGroups),
        getSpecificPermissionGroup: controllerWrapper(getSpecificPermissionGroup),
        postPermissionGroup: controllerWrapper(postPermissionGroup),
        updatePermissionGroups: controllerWrapper(updatePermissionGroups),
        updateSpecificPermissionGroup: controllerWrapper(updateSpecificPermissionGroup),
        patchPermissionGroups: controllerWrapper(patchPermissionGroups),
        patchSpecificPermissionGroup: controllerWrapper(patchSpecificPermissionGroup),
        deletePermissionGroups: controllerWrapper(deletePermissionGroups),
        deleteSpecificPermissionGroup: controllerWrapper(deleteSpecificPermissionGroup)
    }
    