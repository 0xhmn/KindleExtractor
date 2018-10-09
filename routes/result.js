var express = require('express');
var router = express.Router();
var logger = require('../logger/log');

// Database
var dbhandler = require('../db/sqliteWrapper');

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

/* GET upload handler. */
router.get('/', asyncMiddleware(async (req, res, next) => {

  console.log("got the get request");

  let bookName = req.query.name;
  let dbPath = req.query.dbfile;

  console.log("bookname and db file path", bookName, dbPath);

  console.log("+++++++++++ QUERY +++++++++", req.query);

  if (!bookName || !dbPath) {
    logger.error("[BOOK-RESULT] Required information are empty!");
    res.send("Required information are empty!");
  }

  logger.info('[BOOK-RESULT] Preparing the result from file for book  started.');

  // Open the Uploaded DB Connection
  await openDBConnection(dbPath);
  // Retrieving the Data
  var allWords = await waitForWords(bookName);

  console.log("done waiting for words: ", allWords.length);

  res.render('result', {
    title: 'Results',
    'words': allWords
  });
}));

async function openDBConnection(dbPath) {
  await dbhandler.getConnection(dbPath);
}

async function waitForWords(bookName) {
  var result = await dbhandler.queryWordsByBookName(bookName);
  console.log("after wait result", result);
  return result;
}

module.exports = router;