
    const controllerWrapper = require('./controllerWrapper.js');
    const Joi = require('joi');

    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupToPermissionService = dependencyInjector.inject('permissionGroupToPermissionService');

    const specificParametersSchema = Joi.object({
        id: Joi.number().integer().required()
    })

    const getPermissionGroupToPermissionsSchema = Joi.object({
        limit: Joi.number().default(10),
        offset: Joi.number().default(0),
        fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,groupId,permissionId')
    });
    async function getPermissionGroupToPermissions(request, response){
        const validationResult = getPermissionGroupToPermissionsSchema.validate(request.query);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const paginationData = {limit, offset} = validationResult.value;
        const fieldData = validationResult.value.fields;

        const result = await permissionGroupToPermissionService.getPermissionGroupToPermissions(paginationData, fieldData);
        return response.status(result.status).json(result.body);
    }

    const getSpecificPermissionGroupToPermissionSchema = Joi.object({
        fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,groupId,permissionId')
    })
    async function getSpecificPermissionGroupToPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }
        const validationResult = getSpecificPermissionGroupToPermissionSchema.validate(request.query);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const fieldData = validationResult.value.fields;

        const result = await permissionGroupToPermissionService.getSpecificPermissionGroupToPermission(request.params.id, fieldData);
        return response.status(result.status).json(result.body);
    }

    const postPermissionGroupToPermissionSchema = Joi.object({groupId:Joi.number().integer().required(),permissionId:Joi.number().integer().required()})
    async function postPermissionGroupToPermission(request, response){
        const validationResult = postPermissionGroupToPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToPermissionService.postPermissionGroupToPermission(request.body);
        return response.status(result.status).json(result.body);
    }

    const updatePermissionGroupToPermissionsSchema = Joi.array().items({id:Joi.number().integer().required(),groupId:Joi.number().integer().required(),permissionId:Joi.number().integer().required()}) 
    async function updatePermissionGroupToPermissions(request, response){
        const validationResult = updatePermissionGroupToPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToPermissionService.updatePermissionGroupToPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateSpecificPermissionGroupToPermissionSchema = Joi.object({id:Joi.number().integer().required(),groupId:Joi.number().integer().required(),permissionId:Joi.number().integer().required()})
    async function updateSpecificPermissionGroupToPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const validationResult = updateSpecificPermissionGroupToPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToPermissionService.updateSpecificPermissionGroupToPermission(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchPermissionGroupToPermissionsSchema = Joi.array().items({id:Joi.number().integer().required(),groupId:Joi.number().integer(),permissionId:Joi.number().integer()}) 
    async function patchPermissionGroupToPermissions(request, response){
        const validationResult = patchPermissionGroupToPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToPermissionService.patchPermissionGroupToPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchSpecificPermissionGroupToPermissionSchema = Joi.object({groupId:Joi.number().integer(),permissionId:Joi.number().integer()})
    async function patchSpecificPermissionGroupToPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const validationResult = patchSpecificPermissionGroupToPermissionSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToPermissionService.patchSpecificPermissionGroupToPermission(request.params.id, request.body);
        return response.status(result.status).json(result.body);
    }

    const deletePermissionGroupToPermissionsSchema = Joi.array().items(Joi.number());
    async function deletePermissionGroupToPermissions(request, response){
        const validationResult = deletePermissionGroupToPermissionsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await permissionGroupToPermissionService.deletePermissionGroupToPermissions(request.body);
        return response.status(result.status).json(result.body);
    }

    async function deleteSpecificPermissionGroupToPermission(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const result = await permissionGroupToPermissionService.deleteSpecificPermissionGroupToPermission(headerValidation.value.id);
        return response.status(result.status).json(result.body);
    }

    module.exports = {
        getPermissionGroupToPermissions: controllerWrapper(getPermissionGroupToPermissions),
        getSpecificPermissionGroupToPermission: controllerWrapper(getSpecificPermissionGroupToPermission),
        postPermissionGroupToPermission: controllerWrapper(postPermissionGroupToPermission),
        updatePermissionGroupToPermissions: controllerWrapper(updatePermissionGroupToPermissions),
        updateSpecificPermissionGroupToPermission: controllerWrapper(updateSpecificPermissionGroupToPermission),
        patchPermissionGroupToPermissions: controllerWrapper(patchPermissionGroupToPermissions),
        patchSpecificPermissionGroupToPermission: controllerWrapper(patchSpecificPermissionGroupToPermission),
        deletePermissionGroupToPermissions: controllerWrapper(deletePermissionGroupToPermissions),
        deleteSpecificPermissionGroupToPermission: controllerWrapper(deleteSpecificPermissionGroupToPermission)
    }
    