const sqlite3 = require('sqlite3');
const {DATABASE_FILE} = require('./config');

let sqlite = {};
function initializeDb(){
    const db = new sqlite3.Database(DATABASE_FILE);
    db.serialize();
    database.db = db;
}

module.exports.initializeDb = initializeDb;
module.exports.sqlite = sqlite;