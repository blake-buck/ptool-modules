const sqlite3 = require('sqlite3');
const {LOG_DATABASE_FILE} = require('./config');


function initializeSqlite(dbFile){
    logger.info('Initializing Logging Sqlite...');
    const db = new sqlite3.Database(dbFile ? dbFile : LOG_DATABASE_FILE);
    db.serialize();
    dependencyInjector.register('loggingSqlite', db);
    logger.info('Sqlite Logging initialized.');
}

module.exports.initializeLoggingSqlite = initializeSqlite;