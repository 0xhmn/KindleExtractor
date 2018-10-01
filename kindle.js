const sqlite3 = require('sqlite3').verbose();

var queries = require('./db/query');
var dbHelper = require('./db/db-helper');

// CONSTANTS
const BOOK_THE_IDIOT = "The Idiot";

let db = new sqlite3.Database('./sample.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error("Error Happened", err.message);
    }

    console.log("Connected to database");
});

dbHelper.queryEachBook(db, queries.QUERY_READ_BOOK, BOOK_THE_IDIOT);

db.close((err) => {
    if (err) {
        console.error(err.message);
    }

    console.log("DB is closes!");
});