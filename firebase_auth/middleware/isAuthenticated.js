const dependencyInjector = require('../dependency-injector');
const firebaseAuth = dependencyInjector.inject('firebaseAuth');

async function isAuthenticated(request, response, next){
    try{
        const {jwt} = request.headers;
        await firebaseAuth.admin.verifyIdToken(jwt, true);
        next();
    }
    catch(e){
        e.httpStatus = 401;
        next(e);
    }
}

module.exports = isAuthenticated;