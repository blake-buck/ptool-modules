const controllerWrapper = require('./controllerWrapper.js');
const Joi = require('joi');

const dependencyInjector = require('../dependency-injector.js');
const exampleService = dependencyInjector.inject('exampleService');

const validQueryKeys = 'id,description,status'.split(',');

const idParametersSchema = Joi.object({
    id: Joi.number()
})

const getExamplesSchema = Joi
    .object({
        limit: Joi.number().default(10),
        offset: Joi.number().default(0),
        fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,description,status')
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
                in: Joi.alternatives().try(Joi.string().pattern(/^(\d|\d,)+$/), Joi.string().pattern(/^[\w+,*]+$/i), Joi.object({like: Joi.string()})),
            })
        )
    );
async function getExamples(request, response){
    const validationResult = getExamplesSchema.validate(request.query);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }

    const result = await exampleService.getExamples(validationResult);
    return response.status(result.status).json(result.body);
}

const getSpecificExampleSchema = Joi.object({
    fields: Joi.string().pattern(/^[\w+,*]+$/i).default('id,description,status')
})
async function getSpecificExample(request, response){
    const validationResult = getSpecificExampleSchema.validate(request.query);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }

    const validateParams = idParametersSchema.validate(request.params);
    if(validateParams.error){
        throw new Error(validateParams.error);
    }

    const fieldData = validationResult.value.fields;

    const result = await exampleService.getSpecificExample(request.params.id, fieldData);
    return response.status(result.status).json(result.body);
}

const postExampleSchema = Joi.object({
    description: Joi.string(),
    status: Joi.number()
})
async function postExample(request, response){
    const validationResult = postExampleSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }

    const result = await exampleService.postExample(request.body);
    return response.status(result.status).json(result.body);
}

const updateExamplesSchema = Joi.array().items({
    id: Joi.number(),
    description: Joi.string(),
    status: Joi.number()
}) 
async function updateExamples(request, response){
    const validationResult = updateExamplesSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }

    const result = await exampleService.updateExamples(request.body);
    return response.status(result.status).json(result.body);
}

const updateSpecificExampleSchema = Joi.object({
    id: Joi.number(),
    description: Joi.string(),
    status: Joi.number()
})
async function updateSpecificExample(request, response){
    const validationResult = updateSpecificExampleSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }

    const validateParams = idParametersSchema.validate(request.params);
    if(validateParams.error){
        throw new Error(validateParams.error);
    }

    const result = await exampleService.updateSpecificExample(request.body);
    return response.status(result.status).json(result.body);
}

const patchExamplesSchema = Joi.array().items({
    id: Joi.number().required(),
    description: Joi.string(),
    status: Joi.number()
});
async function patchExamples(request, response){
    const validationResult = patchExamplesSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }

    const result = await exampleService.patchExamples(request.body);
    return response.status(result.status).json(result.body);
}

const patchSpecificExampleSchema = Joi.object({
    description: Joi.string(),
    status: Joi.number()
})
async function patchSpecificExample(request, response){
    const validateParams = idParametersSchema.validate(request.params);
    if(validateParams.error){
        throw new Error(validateParams.error);
    }

    const validationResult = patchSpecificExampleSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }


    const result = await exampleService.patchSpecificExample(request.params.id, request.body);
    return response.status(result.status).json(result.body);
}

const deleteExamplesSchema = Joi.array().items(Joi.number());
async function deleteExamples(request, response){
    const validationResult = deleteExamplesSchema.validate(request.body);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }

    const result = await exampleService.deleteExamples(request.body);
    return response.status(result.status).json(result.body);
}

const deleteSpecificExampleSchema = Joi.object({
    id: Joi.number()
});
async function deleteSpecificExample(request, response){
    const validationResult = deleteSpecificExampleSchema.validate(request.params);
    if(validationResult.error){
        throw new Error(validationResult.error);
    }

    const result = await exampleService.deleteSpecificExample(validationResult.value.id);
    return response.status(result.status).json(result.body);
}

module.exports = {
    getExamples: controllerWrapper(getExamples),
    getSpecificExample: controllerWrapper(getSpecificExample),
    postExample: controllerWrapper(postExample),
    updateExamples: controllerWrapper(updateExamples),
    updateSpecificExample: controllerWrapper(updateSpecificExample),
    patchExamples: controllerWrapper(patchExamples),
    patchSpecificExample: controllerWrapper(patchSpecificExample),
    deleteExamples: controllerWrapper(deleteExamples),
    deleteSpecificExample: controllerWrapper(deleteSpecificExample)
}