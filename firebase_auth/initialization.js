const firebaseClient = require('firebase');
const firebaseAdmin = require('firebase-admin');


const firebase = {};
function initializeFirebaseAuth(){
    firebase.client = firebaseClient.auth();
    firebase.admin = firebaseAdmin.auth();
}

module.exports.initializeFirebaseAuth = initializeFirebaseAuth;
module.exports.firebase = firebase;