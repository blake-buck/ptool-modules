
    const controllerWrapper = require('./controllerWrapper.js');
    const Joi = require('joi');

    const dependencyInjector = require('../dependency-injector.js');
    const groupService = dependencyInjector.inject('groupService');

    const validQueryKeys = 'id,name,description'.split(',');

    const specificParametersSchema = Joi.object({
        id: Joi.number().integer().required()
    })


    const getGroupsSchema = Joi
        .object({
            limit: Joi.number().default(10),
            offset: Joi.number().default(0),
            fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,name,description'),
        })
        .pattern(
            Joi.alternatives().try(...validQueryKeys), 
            Joi.alternatives().try(
                Joi.string(), 
                Joi.number(), 
                Joi.boolean()
            )
        );
    async function getGroups(request, response){
        const validationResult = getGroupsSchema.validate(request.query);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const paginationData = {limit, offset} = validationResult.value;
        const fieldData = validationResult.value.fields;
        delete validationResult.value.limit;
        delete validationResult.value.offset;
        delete validationResult.value.fields;
        const remainingQueryData = validationResult.value;

        const result = await groupService.getGroups(paginationData, fieldData, remainingQueryData);
        return response.status(result.status).json(result.body);
    }

    const getSpecificGroupSchema = Joi.object({
        fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,name,description')
    })
    async function getSpecificGroup(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }
        const validationResult = getSpecificGroupSchema.validate(request.query);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const fieldData = validationResult.value.fields;

        const result = await groupService.getSpecificGroup(request.params.id, fieldData);
        return response.status(result.status).json(result.body);
    }

    const postGroupSchema = Joi.object({name:Joi.string().required(),description:Joi.string().required()})
    async function postGroup(request, response){
        const validationResult = postGroupSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await groupService.postGroup(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateGroupsSchema = Joi.array().items({id:Joi.number().integer().required(),name:Joi.string().required(),description:Joi.string().required()}) 
    async function updateGroups(request, response){
        const validationResult = updateGroupsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await groupService.updateGroups(request.body);
        return response.status(result.status).json(result.body);
    }

    const updateSpecificGroupSchema = Joi.object({id:Joi.number().integer().required(),name:Joi.string().required(),description:Joi.string().required()})
    async function updateSpecificGroup(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const validationResult = updateSpecificGroupSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await groupService.updateSpecificGroup(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchGroupsSchema = Joi.array().items({id:Joi.number().integer().required(),name:Joi.string(),description:Joi.string()}) 
    async function patchGroups(request, response){
        const validationResult = patchGroupsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await groupService.patchGroups(request.body);
        return response.status(result.status).json(result.body);
    }

    const patchSpecificGroupSchema = Joi.object({name:Joi.string(),description:Joi.string()})
    async function patchSpecificGroup(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const validationResult = patchSpecificGroupSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await groupService.patchSpecificGroup(request.params.id, request.body);
        return response.status(result.status).json(result.body);
    }

    const deleteGroupsSchema = Joi.array().items(Joi.number());
    async function deleteGroups(request, response){
        const validationResult = deleteGroupsSchema.validate(request.body);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const result = await groupService.deleteGroups(request.body);
        return response.status(result.status).json(result.body);
    }

    async function deleteSpecificGroup(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new Error(headerValidation.error);
        }

        const result = await groupService.deleteSpecificGroup(headerValidation.value.id);
        return response.status(result.status).json(result.body);
    }

    module.exports = {
        getGroups: controllerWrapper(getGroups),
        getSpecificGroup: controllerWrapper(getSpecificGroup),
        postGroup: controllerWrapper(postGroup),
        updateGroups: controllerWrapper(updateGroups),
        updateSpecificGroup: controllerWrapper(updateSpecificGroup),
        patchGroups: controllerWrapper(patchGroups),
        patchSpecificGroup: controllerWrapper(patchSpecificGroup),
        deleteGroups: controllerWrapper(deleteGroups),
        deleteSpecificGroup: controllerWrapper(deleteSpecificGroup)
    }
    