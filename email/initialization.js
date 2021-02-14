function initializeNodeMailer(){
    logger.info('Initializing Nodemailer...');
    const nodeMailer = require('nodemailer');
    const {
        EMAIL_HOST,
        EMAIL_PORT,
        EMAIL_AUTH_USERNAME,
        EMAIL_AUTH_PASSWORD
    } = require('./config')

    dependencyInjector.register(
        'emailTransport', 
        () => nodeMailer.createTransport({
            pool:true,
            host:EMAIL_HOST,
            port:EMAIL_PORT,
            secure:true,
            auth:{
                user:EMAIL_AUTH_USERNAME,
                pass:EMAIL_AUTH_PASSWORD
            }
        })
    )

    logger.info('Nodemailer initialized...');
}

module.exports.initializeNodeMailer = initializeNodeMailer;