function initializeFirebaseStorage(){
    logger.info('Initializing Firebase storage...');
    
    const firebaseAdmin = require('firebase-admin');

    const {
        FIREBASE_STORAGE_BUCKET,
    } = require('./config.js');

    const firebaseStorage = {};
    

    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(require('./credentials.json')),
        storageBucket: FIREBASE_STORAGE_BUCKET
    });
    firebaseStorage.admin = firebaseAdmin.storage();
    dependencyInjector.register('firebaseStorage', () => firebaseStorage);
    logger.info('Firebase storage initialized.');
}

module.exports.initializeFirebaseStorage = initializeFirebaseStorage;