const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const jwks = require('../jwks.json');

const {AWS_CLIENT_ID} = require('../config.js');

// this verifyJWT flow follows the one layed out in the Cognito documentation
// reads a Json Web Key from jwks.json in root, and verifies it agains the token passed in
function verifyJWT(token){
    const tokenHeader = JSON.parse(
        Buffer.from(token.split('.')[0],  'base64').toString()
    );
    const properJwk = jwks.keys.find(jwk => jwk.kid === tokenHeader.kid);
    const pem = jwkToPem(properJwk);
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
            if(err){
                reject(err);
            }
            if(decodedToken){
                resolve(decodedToken)
            }
        })
    })
}

// the actual middleware function
async function isAuthenticated(req, res, next){
    const { jwt } = req.headers;
    
    try{
        if(!jwt){
            throw new Error('No JWT present in request header')
        }

        const decodedToken = await verifyJWT(jwt);

        if(decodedToken.client_id !== AWS_CLIENT_ID){
            throw new Error('Client Id on token does not match User pool Id')
        }

        if(Date.now() > decodedToken.exp){
            throw new Error('Token is expired.');
        }
        // if json web token is valid, continue
        next();
    }
    catch(e){
        // if json web token is invalid, send a response
        e.httpStatus = 403;
        next(e);
    }

}

module.exports = isAuthenticated