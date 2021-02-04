const firebaseClient = require('firebase');
const firebaseAdmin = require('firebase-admin');
const {
    FIREBASE_API_KEY, 
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} = require('./config.js');


function initializeFirebaseAuth(){
    const firebaseAuth = {};
    logger.info('Initializing Firebase Auth...');
    firebaseClient.initializeApp({
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        projectId: FIREBASE_PROJECT_ID,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID
    })
    firebaseAuth.client = firebaseClient.auth();

    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(require('./credentials.json')),
        authDomain: FIREBASE_AUTH_DOMAIN
    });
    firebaseAuth.admin = firebaseAdmin.auth();
    dependencyInjector.register('firebaseAuth', () => firebaseAuth);
    logger.info('Firebase Auth initialized.');
}

module.exports.initializeFirebaseAuth = initializeFirebaseAuth;