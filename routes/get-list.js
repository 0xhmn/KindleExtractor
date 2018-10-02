var express = require('express');
var router = express.Router();
var logger = require('../logger/log');

// Database
var db = require('../db/sqliteWrapper');

// File Uploading Handler
var multer = require('multer');
var upload = multer({
    dest: 'uploaded-files/'
})

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

/* POST upload handler. */
router.post('/', upload.single('dbfile'), asyncMiddleware(async (req, res, next) => {
    logger.info('[BOOK-TITLE] Uploading file started.');

    var dbfile = req.file;

    logger.info('[BOOK-TITLE] Uploading file', dbfile);

    // Open the DB Connection
    await openDBConnection(dbfile);
    // Retrieving the Data
    const allbooks = await waitForBooks();

    logger.info("[BOOK-TITLE] Json Result: ", allbooks);

    // close the connection
    db.closeConnection();

    res.json(allbooks);
}));

async function openDBConnection(dbfile) {
    await db.getConnection(dbfile.path);
}

async function waitForBooks() {
    var result = await db.queryBookNames();
    console.log("after wait result", result);
    return result;
}

module.exports = router;