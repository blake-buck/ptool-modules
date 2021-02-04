
    const controllerWrapper = require('./controllerWrapper.js');
    const Joi = require('joi');

    const dependencyInjector = require('../dependency-injector.js');
    const groupLevelPermissionService = dependencyInjector.inject('groupLevelPermissionService');

    const {BadRequestError} = require('../constants/errors')

    const validQueryKeys = 'id,tableName,groupId,permissionType,granteeId,get,post'.split(',');

    const specificParametersSchema = Joi.object({
        id: Joi.number().integer().required()
    })

    const getGroupLevelPermissionsSchema = Joi
        .object({
            limit: Joi.number().default(10),
            offset: Joi.number().default(0),
            fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,tableName,groupId,permissionType,granteeId,get,post')
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

    async function getGroupLevelPermissions(request, response){
        const validationResult = getGroupLevelPermissionsSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await groupLevelPermissionService.getGroupLevelPermissions(validationResult);
        return response.status(result.status).json(result.body);
    }

    const getSpecificGroupLevelPermissionSchema = Joi.object({
        fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,tableName,groupId,permissionType,granteeId,get,post')
    })
    async function getSpecificGroupLevelPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }
        const validationResult = getSpecificGroupLevelPermissionSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const fieldData = validationResult.value.fields;

        const result = await groupLevelPermissionService.getSpecificGroupLevelPermission(request.params.id, fieldData);
        return response.status(result.status).json(result.body);
    }

    const postGroupLevelPermissionSchema = Joi.object({tableName:Joi.string().required(),groupId:Joi.number().integer().required(),permissionType:Joi.string().required(),granteeId:Joi.string().required(),get:Joi.number().integer().required(),post:Joi.number().integer().required()})
    async function postGroupLevelPermission(request, response){
        const validationResult = postGroupLevelPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await groupLevelPermissionService.postGroupLevelPermission(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateGroupLevelPermissionsSchema = Joi.array().items({id:Joi.number().integer().required(),tableName:Joi.string().required(),groupId:Joi.number().integer().required(),permissionType:Joi.string().required(),granteeId:Joi.string().required(),get:Joi.number().integer().required(),post:Joi.number().integer().required()}) 
    async function updateGroupLevelPermissions(request, response){
        const validationResult = updateGroupLevelPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await groupLevelPermissionService.updateGroupLevelPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateSpecificGroupLevelPermissionSchema = Joi.object({id:Joi.number().integer().required(),tableName:Joi.string().required(),groupId:Joi.number().integer().required(),permissionType:Joi.string().required(),granteeId:Joi.string().required(),get:Joi.number().integer().required(),post:Joi.number().integer().required()})
    async function updateSpecificGroupLevelPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const validationResult = updateSpecificGroupLevelPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await groupLevelPermissionService.updateSpecificGroupLevelPermission(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchGroupLevelPermissionsSchema = Joi.array().items({id:Joi.number().integer().required(),tableName:Joi.string(),groupId:Joi.number().integer(),permissionType:Joi.string(),granteeId:Joi.string(),get:Joi.number().integer(),post:Joi.number().integer()}) 
    async function patchGroupLevelPermissions(request, response){
        const validationResult = patchGroupLevelPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await groupLevelPermissionService.patchGroupLevelPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchSpecificGroupLevelPermissionSchema = Joi.object({tableName:Joi.string(),groupId:Joi.number().integer(),permissionType:Joi.string(),granteeId:Joi.string(),get:Joi.number().integer(),post:Joi.number().integer()})
    async function patchSpecificGroupLevelPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const validationResult = patchSpecificGroupLevelPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await groupLevelPermissionService.patchSpecificGroupLevelPermission(request.params.id, request.body);
        return response.status(result.status).json(result.body);
    }

    const deleteGroupLevelPermissionsSchema = Joi.array().items(Joi.number());
    async function deleteGroupLevelPermissions(request, response){
        const validationResult = deleteGroupLevelPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await groupLevelPermissionService.deleteGroupLevelPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    async function deleteSpecificGroupLevelPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const result = await groupLevelPermissionService.deleteSpecificGroupLevelPermission(headerValidation.value.id);
        return response.status(result.status).json(result.body);
    }

    module.exports = {
        getGroupLevelPermissions: controllerWrapper(getGroupLevelPermissions),
        getSpecificGroupLevelPermission: controllerWrapper(getSpecificGroupLevelPermission),
        postGroupLevelPermission: controllerWrapper(postGroupLevelPermission),
        updateGroupLevelPermissions: controllerWrapper(updateGroupLevelPermissions),
        updateSpecificGroupLevelPermission: controllerWrapper(updateSpecificGroupLevelPermission),
        patchGroupLevelPermissions: controllerWrapper(patchGroupLevelPermissions),
        patchSpecificGroupLevelPermission: controllerWrapper(patchSpecificGroupLevelPermission),
        deleteGroupLevelPermissions: controllerWrapper(deleteGroupLevelPermissions),
        deleteSpecificGroupLevelPermission: controllerWrapper(deleteSpecificGroupLevelPermission)
    }
    