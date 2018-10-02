const sqlite3 = require('sqlite3').verbose();
var logger = require('./../logger/log');
var query = require('./query');

/**
 * Hold the database connection.
 */
let databaseConnection;

/**
 * Open the database connection.
 * @param {String} dbFullName 
 */
function getConnection(dbFullName) {
    return new Promise((resolve, reject) => {
        if (databaseConnection) {
            logger.error("Database Connection is already initialized!");
            resolve(databaseConnection);
        }

        databaseConnection = new sqlite3.Database(dbFullName, (err) => {
            if (err) {
                logger.error("[ERROR] when tried to connect to database.", err);
                reject(err);
            }
        });

        logger.info("Connected to database: ", dbFullName);
        resolve(databaseConnection);
    });
}

/**
 * Close the database connection.
 */
function closeConnection() {
    return new Promise((resolve, reject) => {
        databaseConnection.close((err) => {
            if (err) {
                logger.error("[ERROR] while closing the database.", err);
                reject(err);
            } else {
                logger.info("DB Closed Successfully!");
                resolve(true);
            }
        })
    });
}

/**
 * Perform a Query against the Database.
 * @param {String} query 
 */
function queryWordsByBookName(query, bookName) {
    return new Promise((resolve, reject) => {
        databaseConnection.each(query, [bookName], (err, row) => {
            if (err) {
                logger.error("[ERROR] while performing the query.", err);
                reject(err);
            } else {
                logger.info("[INFO] READ ROW:", row);
                resolve(row);
            }
        })
    });
}

function queryBookNames() {
    return new Promise((resolve, reject) => {
        databaseConnection.all(query.QUERY_BOOK_NAMES, [], (err, rows) => {
            if (err) {
                logger.error("[ERROR] while performing the query.", err);
                reject(err);
            } else {
                logger.info("[INFO] READ ALL ROWS:", rows);
                resolve(rows);
            }
        })
    });
}

module.exports = {
    getConnection,
    queryWordsByBookName,
    queryBookNames,
    closeConnection
};