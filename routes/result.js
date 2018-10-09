var express = require('express');
var router = express.Router();
var logger = require('../logger/log');
var dic = require('./../dic/dictionary');

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
  var allWordsDetails = await waitForWords(bookName);
  console.log("done waiting for words: ", allWordsDetails.length);
  // Retrieving all the definitions
  var allDefinitions = await lookupDefinitions(allWordsDetails);
  console.log("done waiting for dictionary: ", allDefinitions);

  res.render('result', {
    'title': 'Results',
    'book' : bookName,
    'words': allWordsDetails,
    'definitionDict': allDefinitions
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

async function lookupDefinitions(wordDetails) {
  var dictResult = {};

  for (const wd of wordDetails) {
    let word = wd.word;
    var defRes = await dic.lookupWordPromisify(word);
    dictResult[word] = defRes.data;
    console.log("got the definition!", defRes.data);
  }

  return dictResult;
}

module.exports = router;