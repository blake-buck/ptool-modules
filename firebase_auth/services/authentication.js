const {firebase} = require('../initialization.js');


async function register(email, password){
    return {
        status: 200,
        body: await firebase.client.createUserWithEmailAndPassword(email, password)
    }
}

async function login(email, password){
    return {
        status: 200,
        body: await firebase.client.signInWithEmailAndPassword(email, password)
    }
}

async function changePassword(email, previousPassword, proposedPassword){
    // verify that previous password is valid
    await firebase.client.signInWithEmailAndPassword(email, previousPassword);

    const {uid} = await firebase.admin.getUserByEmail(email);
    await firebase.admin.updateUser(uid, {password: proposedPassword});

    // sign users out globally
    return {
        status: 200,
        body: await firebase.admin.revokeRefreshTokens(uid)
    }
}

async function forgotPassword(email){
    return {
        status: 200,
        body: await firebase.client.sendPasswordResetEmail(email)
    }
}

async function forgotPasswordConfirm(confirmationCode, newPassword){
    return {
        status: 200,
        body: await firebase.client.confirmPasswordReset(confirmationCode, newPassword)
    }
}

async function deleteAccount(email){
    const {uid} = await firebase.admin.getUserByEmail(email);
    return {
        status: 200,
        body: await firebase.admin.deleteUser(uid)
    }
}

module.exports = {
    register,
    login,
    changePassword,
    forgotPassword,
    forgotPasswordConfirm,
    deleteAccount,
}