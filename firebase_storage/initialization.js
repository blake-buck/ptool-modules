function initializeFirebaseStorage(){
    const firebaseClient = require('firebase');
    const firebaseAdmin = require('firebase-admin');

    const {
        FIREBASE_API_KEY, 
        FIREBASE_STORAGE_BUCKET,
        FIREBASE_PROJECT_ID,
        FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID
    } = require('./config.js');

    const firebaseStorage = {};
    logger.info('Initializing Firebase storage...');
    firebaseClient.initializeApp({
        apiKey: FIREBASE_API_KEY,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        projectId: FIREBASE_PROJECT_ID,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID
    })
    firebaseStorage.client = firebaseClient.auth();

    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(require('./credentials.json')),
        storageBucket: FIREBASE_STORAGE_BUCKET
    });
    firebaseStorage.admin = firebaseAdmin.auth();
    dependencyInjector.register('firebaseStorage', () => firebaseStorage);
    logger.info('Firebase storage initialized.');
}

module.exports.initializeFirebaseStorage = initializeFirebaseStorage;