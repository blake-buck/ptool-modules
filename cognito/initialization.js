const {
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID,
    AWS_REGION
} = require('./config.js');

const {CognitoIdentityServiceProvider} = require('aws-sdk');


function initializeCognito(){
    logger.info('Initializing Amazon Cognito...');
    dependencyInjector.register(
        'cognito', 
        new CognitoIdentityServiceProvider({
            secretAccessKey: AWS_SECRET_ACCESS_KEY, 
            accessKeyId: AWS_ACCESS_KEY_ID, 
            region: AWS_REGION
        })
    );
    logger.info('Amazon Cognito initialized.');
}


module.exports.initializeCognito = initializeCognito;