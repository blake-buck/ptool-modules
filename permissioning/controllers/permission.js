
    const controllerWrapper = require('./controllerWrapper.js');
    const Joi = require('joi');

    const dependencyInjector = require('../dependency-injector.js');
    const permissionService = dependencyInjector.inject('permissionService');

    const {BadRequestError} = require('../constants/errors')
    
    const validQueryKeys = 'id,name,description'.split(',');

    const specificParametersSchema = Joi.object({
        id: Joi.number().integer().required()
    })

    const getPermissionsSchema = Joi
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

    async function getPermissions(request, response){
        const validationResult = getPermissionsSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await permissionService.getPermissions(validationResult);
        return response.status(result.status).json(result.body);
    }

    const getSpecificPermissionSchema = Joi.object({
        fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,name,description')
    })
    async function getSpecificPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }
        const validationResult = getSpecificPermissionSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const fieldData = validationResult.value.fields;

        const result = await permissionService.getSpecificPermission(request.params.id, fieldData);
        return response.status(result.status).json(result.body);
    }

    const postPermissionSchema = Joi.object({
        name:Joi.string().pattern(/^(\w+_)+(GET|POST|MODIFY|DELETE)$/).required(),
        description:Joi.string().required()
    });
    async function postPermission(request, response){
        const validationResult = postPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await permissionService.postPermission(request.body);
        return response.status(result.status).json(result.body);
    }

    const updatePermissionsSchema = Joi.array().items({id:Joi.number().integer().required(),name:Joi.string().required(),description:Joi.string().required()}) 
    async function updatePermissions(request, response){
        const validationResult = updatePermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await permissionService.updatePermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateSpecificPermissionSchema = Joi.object({id:Joi.number().integer().required(),name:Joi.string().required(),description:Joi.string().required()})
    async function updateSpecificPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const validationResult = updateSpecificPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await permissionService.updateSpecificPermission(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchPermissionsSchema = Joi.array().items({id:Joi.number().integer().required(),name:Joi.string(),description:Joi.string()}) 
    async function patchPermissions(request, response){
        const validationResult = patchPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await permissionService.patchPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchSpecificPermissionSchema = Joi.object({name:Joi.string(),description:Joi.string()})
    async function patchSpecificPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const validationResult = patchSpecificPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await permissionService.patchSpecificPermission(request.params.id, request.body);
        return response.status(result.status).json(result.body);
    }

    const deletePermissionsSchema = Joi.array().items(Joi.number());
    async function deletePermissions(request, response){
        const validationResult = deletePermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await permissionService.deletePermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    async function deleteSpecificPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }

        const result = await permissionService.deleteSpecificPermission(headerValidation.value.id);
        return response.status(result.status).json(result.body);
    }

    module.exports = {
        getPermissions: controllerWrapper(getPermissions),
        getSpecificPermission: controllerWrapper(getSpecificPermission),
        postPermission: controllerWrapper(postPermission),
        updatePermissions: controllerWrapper(updatePermissions),
        updateSpecificPermission: controllerWrapper(updateSpecificPermission),
        patchPermissions: controllerWrapper(patchPermissions),
        patchSpecificPermission: controllerWrapper(patchSpecificPermission),
        deletePermissions: controllerWrapper(deletePermissions),
        deleteSpecificPermission: controllerWrapper(deleteSpecificPermission)
    }
    