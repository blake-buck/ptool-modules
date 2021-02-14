const dependencyInjector = require('../dependency-injector');
const emailTransport = dependencyInjector.inject('emailTransport');
const Joi = require('joi');
const {
    STANDARD_FROM_EMAIL_ACCOUNT
} = require('../config');
const {BadRequestError} = require('../constants/errors');

const sendEmailVerification = Joi.object({
    from: Joi.string().email().default(STANDARD_FROM_EMAIL_ACCOUNT),
    to: Joi.string().email().required(),
    subject: Joi.string().required(),
    text: Joi.string(),
    html: Joi.string()
});
async function sendEmail(requestObj){
    const verificationResult = sendEmailVerification.validate(requestObj);
    if(verificationResult.error){
        throw new BadRequestError(verificationResult.error);
    }
    const message = verificationResult.value;
    if((!message.text && !message.html) || (message.text && message.html)){
        throw new BadRequestError('You must include the text property OR the html property')
    }

    return await emailTransport.sendMail(message);
}

module.exports = {
    sendEmail
}