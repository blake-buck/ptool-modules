const dependencyInjector = require('../dependency-injector');
const firebaseAuth = dependencyInjector.inject('firebaseAuth');
const {UnAuthenticatedRequestError} = require('../constants/errors')
async function isAuthenticated(request, response, next){
    try{
        const {jwt} = request.headers;
        await firebaseAuth.admin.verifyIdToken(jwt, true);
        next();
    }
    catch(e){
        next(new UnAuthenticatedRequestError(e.message));
    }
}

module.exports = isAuthenticated;