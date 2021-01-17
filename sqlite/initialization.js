const sqlite3 = require('sqlite3');
const {DATABASE_FILE} = require('./config');

let sqlite = {};
function initializeSqlite(dbFile){
    const db = new sqlite3.Database(dbFile ? dbFile : DATABASE_FILE);
    db.serialize();
    sqlite.db = db;
}

module.exports.initializeSqlite = initializeSqlite;
module.exports.sqlite = sqlite;