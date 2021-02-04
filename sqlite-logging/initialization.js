const sqlite3 = require('sqlite3');
const {LOG_DATABASE_FILE} = require('./config');


function initializeLoggingSqlite(dbFile){
    logger.info('Initializing Logging Sqlite...');
    const db = new sqlite3.Database(dbFile ? dbFile : LOG_DATABASE_FILE);
    db.serialize();
    dependencyInjector.register('loggingSqlite', db);
    logger.info('Sqlite Logging initialized.');
}

function initializeLogDashboard(app){
    const express = require('express');

    app.use('/log-dashboard', express.static('log-dashboard', {index:'log-dashboard.html'}));
}

module.exports.initializeLoggingSqlite = initializeLoggingSqlite;
module.exports.initializeLogDashboard = initializeLogDashboard;