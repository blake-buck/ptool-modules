const {firebase} = require('../initialization');

async function isAuthenticated(request, response, next){
    try{
        const {jwt} = request.headers;
        await firebase.admin.verifyIdToken(jwt, true);
        next();
    }
    catch(e){
        e.httpStatus = 401;
        next(e);
    }
}

module.exports = isAuthenticated;