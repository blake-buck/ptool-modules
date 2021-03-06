const dependencyInjector = require('../dependency-injector.js');
const firebaseAuth = dependencyInjector.inject('firebaseAuth');
const logger = require('../logger');

async function register(email, password){
    try{
        const {user} = await firebaseAuth.client.createUserWithEmailAndPassword(email, password);
        await user.sendEmailVerification();
    }
    catch(e){
        logger.error(e);
        if(e.code !== 'auth/email-already-in-use'){
            throw e
        }
    }
    
    return {
        status: 200,
        body: {message:'A verification message has been sent to the email you provided.'}
    }
}

async function login(email, password){
    const {user} = await firebaseAuth.client.signInWithEmailAndPassword(email, password)
    return {
        status: 200,
        body: {jwt: await user.getIdToken()}
    }
}

async function changePassword(previousPassword, proposedPassword, jwt){
    const {email} = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());

    // verify that previous password is valid
    await firebaseAuth.client.signInWithEmailAndPassword(email, previousPassword);

    const {uid} = await firebaseAuth.admin.getUserByEmail(email);
    await firebaseAuth.admin.updateUser(uid, {password: proposedPassword});

    // sign user out globally
    await firebaseAuth.admin.revokeRefreshTokens(uid)
    return {
        status: 200,
        body: {message: 'Password has been changed.'}
    }
}

async function forgotPassword(email){
    await firebaseAuth.client.sendPasswordResetEmail(email);
    return {
        status: 200,
        body: {message: 'A password-reset message has been sent to the email provided'}
    }
}

async function deleteAccount(jwt){
    const {email} = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
    const {uid} = await firebaseAuth.admin.getUserByEmail(email);
    await firebaseAuth.admin.deleteUser(uid)
    return {
        status: 200,
        body: {message:'The account has been successfully deleted'}
    }
}

module.exports = {
    register,
    login,
    changePassword,
    forgotPassword,
    deleteAccount,
}