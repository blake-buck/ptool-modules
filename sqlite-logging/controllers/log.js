
    const controllerWrapper = require('./controllerWrapper.js');
    const Joi = require('joi');

    const dependencyInjector = require('../dependency-injector.js');
    const logService = dependencyInjector.inject('logService');

    const validQueryKeys = 'id,name,hostName,pid,level,message,fullBody,time,version'.split(',');

    const {BadRequestError} = require('../constants/errors')
    
    const specificParametersSchema = Joi.object({
        id: Joi.number().integer().required()
    })

    const getLogsSchema = Joi
        .object({
            limit: Joi.number().default(10),
            offset: Joi.number().default(0),
            fields: Joi.string().pattern(/^[\w+,*]+[\w]$/i).default('id,name,hostName,pid,level,message,fullBody,time,version')
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

    async function getLogs(request, response){
        const validationResult = getLogsSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const result = await logService.getLogs(validationResult);
        return response.status(result.status).json(result.body);
    }

    const getSpecificLogSchema = Joi.object({
        fields: Joi.string().pattern(/^[\w+,*]+[\w]$/i).default('id,name,hostName,pid,level,message,fullBody,time,version')
    })
    async function getSpecificLog(request, response){
        const headerValidation = specificParametersSchema.validate(request.params);
        if(headerValidation.error){
            throw new BadRequestError(headerValidation.error);
        }
        const validationResult = getSpecificLogSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }

        const fieldData = validationResult.value.fields;

        const result = await logService.getSpecificLog(request.params.id, fieldData);
        return response.status(result.status).json(result.body);
    }

    const getLogCountSchema = Joi.object().pattern(
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
    async function getLogCount(request, response){
        const validationResult = getLogCountSchema.validate(request.query);
        if(validationResult.error){
            throw new BadRequestError(validationResult.error);
        }
        const result = await logService.getLogCount(validationResult);
        return response.status(result.status).json(result.body);
    }

    module.exports = {
        getLogCount: controllerWrapper(getLogCount),
        getLogs: controllerWrapper(getLogs),
        getSpecificLog: controllerWrapper(getSpecificLog)
    }
    