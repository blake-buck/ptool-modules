const {
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID,
    AWS_REGION
} = require('./config.js');

const {CognitoIdentityServiceProvider} = require('aws-sdk');

const aws = {};
function initializeCognito(){
    logger.info('Initializing Amazon Cognito...');
    aws.cognito = new CognitoIdentityServiceProvider({
        secretAccessKey: AWS_SECRET_ACCESS_KEY, 
        accessKeyId: AWS_ACCESS_KEY_ID, 
        region: AWS_REGION
    });
    logger.info('Amazon Cognito initialized.');
}


module.exports.initializeCognito = initializeCognito;
module.exports.aws = aws;