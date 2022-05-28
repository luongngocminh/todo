const sqlite3 = require('sqlite3');

const DBSOURCE = 'db.sqlite';

// Status:
// 0 undone
// 1 done

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description text, 
            status INTEGER
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = 'INSERT INTO todo (description, status) VALUES (?,?)';
          db.run(insert, ['Buy bread', 0]);
          db.run(insert, ['Buy milk', 1]);
        }
      }
    );
  }
});

module.exports = db;