const bunyan = require('bunyan');
const sqlite3 = require('sqlite3');

const { Writable } = require("stream");

const {LOG_DATABASE_FILE} = require('./config');

const db = new sqlite3.Database(LOG_DATABASE_FILE);

let hasCreatedDatabase = false;


const writeToLogDatabase = new Writable({
  write(chunk, encoding, callback) {
    if(!hasCreatedDatabase){
      db.exec(
          `CREATE TABLE IF NOT EXISTS log(id INTEGER PRIMARY KEY ASC, name TEXT, hostName TEXT, pid INTEGER, level INTEGER, message TEXT, fullBody TEXT, time TEXT, version INTEGER);`,
          (err) => {
              if(err){
                  console.error(err);
              }
          }
      )
      hasCreatedDatabase=true;
    }
    const jsonObjString = chunk.toString();
    const {name, hostname, pid, level, msg, time, v} = JSON.parse(jsonObjString);
    // write to db
    db.run(
      `
      INSERT INTO log(name, hostname, pid, level, message, fullBody, time, version)
      VALUES($name, $hostname, $pid, $level, $message, $fullBody, $time, $version);
      `,
      {
        $name: name,
        $hostname: hostname,
        $pid: pid,
        $level: level,
        $message: msg,
        $fullBody: jsonObjString,
        $time: time,
        $version: v,
      },
      (err) => {
          if(err){
            console.error(err);
          }
      }
    );

    callback();
  }
});

const standardLogger = bunyan.createLogger({name: 'standardLogger'});

standardLogger.addStream({
    type:'stream',
    stream: writeToLogDatabase
})

module.exports = standardLogger;