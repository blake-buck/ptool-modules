const firebaseClient = require('firebase');
const firebaseAdmin = require('firebase-admin');
const {
    FIREBASE_API_KEY, 
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} = require('./config.js');

const firebase = {};
function initializeFirebaseAuth(){
    logger.info('Initializing Firebase Auth...');
    firebaseClient.initializeApp({
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        projectId: FIREBASE_PROJECT_ID,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID
    })
    firebase.client = firebaseClient.auth();

    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(require('./credentials.json')),
        authDomain: FIREBASE_AUTH_DOMAIN
    });
    firebase.admin = firebaseAdmin.auth();
    logger.info('Firebase Auth initialized.');
}

module.exports.initializeFirebaseAuth = initializeFirebaseAuth;
module.exports.firebase = firebase;