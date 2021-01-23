const logger = require('../logger');

const {createHmac} = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const {
    AWS_CLIENT_ID,
    AWS_COGNITO_SECRET_HASH,
    AWS_USER_POOL_ID,
    AWS_COGNITO_SERVER_NAME
} = require('../config.js');

const {aws} = require('../initialization');


function decodeToken(jwt){
    const decodedToken = jsonwebtoken.decode(jwt);
    return decodedToken
}

function getUserIdFromToken(jwt){
    const decoded = decodeToken(jwt);
    if(decoded && decoded['username']){
        return decoded['username'];
    }
    
    throw new Error('Username doesn\'t exist on authentication token');
}

function createSecretHash(username){
    return createHmac('sha256', AWS_COGNITO_SECRET_HASH).update(username + AWS_CLIENT_ID).digest('base64')
}

function formatHeaders(headers){
    let newHeaders = [];

    for(const headerName in headers){
        newHeaders.push({
            headerName,
            headerValue: headers[headerName]
        });
    }

    return newHeaders;
}



async function register(username, password){
    try{
        const params = {
            ClientId: AWS_CLIENT_ID,
            Username: username,
            Password: password,
            SecretHash: createSecretHash(username)
        };
        await aws.cognito.signUp(params).promise()
    }
    catch(e){
        // we dont want potential attackers to know what emails already exist in the system; but if it isn't a UsernameExistsException we want the error to be handled
        if(e.name !== 'UsernameExistsException'){
            throw e;
        }
    }
    return {status:200, body: {message:'Check your email for a registration message.'}};

    
}
async function login(username, password, {ip, headers}){
    const params = {
        AuthFlow:   'ADMIN_USER_PASSWORD_AUTH',
        UserPoolId: AWS_USER_POOL_ID,
        ClientId:   AWS_CLIENT_ID,
        
        AuthParameters:{
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: createSecretHash(username)
        },

        ContextData:{
            IpAddress:   ip,
            ServerName:  AWS_COGNITO_SERVER_NAME,
            ServerPath:  '/api/login',
            HttpHeaders: formatHeaders(headers)
        }
    }

    return {status: 200, body: await aws.cognito.adminInitiateAuth(params).promise()};
}

async function refreshToken({refresh, headers, ip}){
    const params = {
        UserPoolId: AWS_USER_POOL_ID,
        ClientId: AWS_CLIENT_ID,
        AuthFlow:'REFRESH_TOKEN_AUTH',
        
        AuthParameters:{
            REFRESH_TOKEN:refresh,
            SECRET_HASH: createSecretHash(getUserIdFromToken(headers.jwt)),
        },

        ContextData:{
            IpAddress:   ip,
            ServerName:  AWS_COGNITO_SERVER_NAME,
            ServerPath:  '/api/refresh',
            HttpHeaders: formatHeaders(headers)
        }
    };

    return {status:200, body: await aws.cognito.adminInitiateAuth(params).promise()};
}
async function changePassword({previousPassword, proposedPassword}, jwt){
    const signOutParams = {
        AccessToken: jwt
    }
    const changePasswordParams = {
        AccessToken: jwt,
        PreviousPassword: previousPassword,
        ProposedPassword: proposedPassword
    }

    await aws.cognito.changePassword(changePasswordParams).promise();
    await aws.cognito.globalSignOut(signOutParams).promise();

    // the above functions return nothing if they succeed, hence the need for an empty body here
    return {status: 200, body: {}};
    
}
async function forgotPassword(username){
    const params = {
        ClientId: AWS_CLIENT_ID,
        Username: username,
        SecretHash: createSecretHash(username)
    }

    return {status:200, body: await aws.cognito.forgotPassword(params).promise()};
}
async function confirmForgotPassword({confirmationCode, username, password}){
    const params = {
        ClientId: AWS_CLIENT_ID,
        ConfirmationCode: confirmationCode,
        Username:username,
        Password:password,
        SecretHash: createSecretHash(username)
    }

    await aws.cognito.confirmForgotPassword(params).promise();

    // the above function returns nothing if it succeeds, hence the need for an empty body here
    return {status:200, body: {}};
    
}
async function deleteAccount(jwt){
    const params = {
        AccessToken:jwt
    }
    await aws.cognito.deleteUser(params).promise();

    // the above function returns nothing if it succeeds, hence the need for an empty body here
    return {status:200, body: {}};
}

module.exports = {
    register,
    login,
    refreshToken,
    changePassword,
    forgotPassword,
    confirmForgotPassword,
    deleteAccount,
    createSecretHash,
    formatHeaders,
}