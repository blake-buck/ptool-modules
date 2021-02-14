const dependencyInjector = require('../dependency-injector');
const emailService = dependencyInjector.inject('emailService');
const controllerWrapper = require('./controllerWrapper');

async function sendEmail(request, response){
    await emailService.sendEmail(request.body);
    return response.status(200).json({message: 'Email sent'})
}

module.exports = {
    sendEmail: controllerWrapper(sendEmail)
}