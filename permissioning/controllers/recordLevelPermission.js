
    const controllerWrapper = require('./controllerWrapper.js');
    const Joi = require('joi');

    const dependencyInjector = require('../dependency-injector.js');
    const recordLevelPermissionService = dependencyInjector.inject('recordLevelPermissionService');

    const {BadRequestError} = require('../constants/errors')
    
    const validQueryKeys = 'id,tableName,recordId,permissionType,granteeId,get,modify,del'.split(',');

    const specificParametersSchema = Joi.object({
        id: Joi.number().integer().required()
    })

    const getRecordLevelPermissionsSchema = Joi
        .object({
            limit: Joi.number().default(10),
            offset: Joi.number().default(0),
            fields: Joi.string().pattern(/^[\w+,*]+[\w]$/i).default('id,tableName,recordId,permissionType,granteeId,get,modify,del')
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
                    in: Joi.alternatives().try(Joi.string().pattern(/^(d|d,)+$/), Joi.string().pattern(/^[\w+,*]+[\w]$/i), Joi.object({like: Joi.string()})),
                })
            )
        );

    async function getRecordLevelPermissions(request, response){
        const validationResult = getRecordLevelPermissionsSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await recordLevelPermissionService.getRecordLevelPermissions(validationResult);
        return response.status(result.status).json(result.body);
    }

    const getSpecificRecordLevelPermissionSchema = Joi.object({
        fields: Joi.string().pattern(/^[\w+,*]+[\w]$/i).default('id,tableName,recordId,permissionType,granteeId,get,modify,del')
    })
    async function getSpecificRecordLevelPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }
        const validationResult = getSpecificRecordLevelPermissionSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const fieldData = validationResult.value.fields;

        const result = await recordLevelPermissionService.getSpecificRecordLevelPermission(request.params.id, fieldData);
        return response.status(result.status).json(result.body);
    }

    const postRecordLevelPermissionSchema = Joi.object({tableName:Joi.string().required(),recordId:Joi.number().integer().required(),permissionType:Joi.string().required(),granteeId:Joi.string().required(),get:Joi.number().integer().required(),modify:Joi.number().integer().required(),del:Joi.number().integer().required()})
    async function postRecordLevelPermission(request, response){
        const validationResult = postRecordLevelPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await recordLevelPermissionService.postRecordLevelPermission(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateRecordLevelPermissionsSchema = Joi.array().items({id:Joi.number().integer().required(),tableName:Joi.string().required(),recordId:Joi.number().integer().required(),permissionType:Joi.string().required(),granteeId:Joi.string().required(),get:Joi.number().integer().required(),modify:Joi.number().integer().required(),del:Joi.number().integer().required()}) 
    async function updateRecordLevelPermissions(request, response){
        const validationResult = updateRecordLevelPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await recordLevelPermissionService.updateRecordLevelPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateSpecificRecordLevelPermissionSchema = Joi.object({id:Joi.number().integer().required(),tableName:Joi.string().required(),recordId:Joi.number().integer().required(),permissionType:Joi.string().required(),granteeId:Joi.string().required(),get:Joi.number().integer().required(),modify:Joi.number().integer().required(),del:Joi.number().integer().required()})
    async function updateSpecificRecordLevelPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const validationResult = updateSpecificRecordLevelPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await recordLevelPermissionService.updateSpecificRecordLevelPermission(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchRecordLevelPermissionsSchema = Joi.array().items({id:Joi.number().integer().required(),tableName:Joi.string(),recordId:Joi.number().integer(),permissionType:Joi.string(),granteeId:Joi.string(),get:Joi.number().integer(),modify:Joi.number().integer(),del:Joi.number().integer()}) 
    async function patchRecordLevelPermissions(request, response){
        const validationResult = patchRecordLevelPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await recordLevelPermissionService.patchRecordLevelPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchSpecificRecordLevelPermissionSchema = Joi.object({tableName:Joi.string(),recordId:Joi.number().integer(),permissionType:Joi.string(),granteeId:Joi.string(),get:Joi.number().integer(),modify:Joi.number().integer(),del:Joi.number().integer()})
    async function patchSpecificRecordLevelPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const validationResult = patchSpecificRecordLevelPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await recordLevelPermissionService.patchSpecificRecordLevelPermission(request.params.id, request.body);
        return response.status(result.status).json(result.body);
    }

    const deleteRecordLevelPermissionsSchema = Joi.array().items(Joi.number());
    async function deleteRecordLevelPermissions(request, response){
        const validationResult = deleteRecordLevelPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await recordLevelPermissionService.deleteRecordLevelPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    async function deleteSpecificRecordLevelPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const result = await recordLevelPermissionService.deleteSpecificRecordLevelPermission(headerValidation.value.id);
        return response.status(result.status).json(result.body);
    }

    module.exports = {
        getRecordLevelPermissions: controllerWrapper(getRecordLevelPermissions),
        getSpecificRecordLevelPermission: controllerWrapper(getSpecificRecordLevelPermission),
        postRecordLevelPermission: controllerWrapper(postRecordLevelPermission),
        updateRecordLevelPermissions: controllerWrapper(updateRecordLevelPermissions),
        updateSpecificRecordLevelPermission: controllerWrapper(updateSpecificRecordLevelPermission),
        patchRecordLevelPermissions: controllerWrapper(patchRecordLevelPermissions),
        patchSpecificRecordLevelPermission: controllerWrapper(patchSpecificRecordLevelPermission),
        deleteRecordLevelPermissions: controllerWrapper(deleteRecordLevelPermissions),
        deleteSpecificRecordLevelPermission: controllerWrapper(deleteSpecificRecordLevelPermission)
    }
    