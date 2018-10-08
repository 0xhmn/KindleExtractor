var express = require('express');
var router = express.Router();
var logger = require('../logger/log');

// Database
var db = require('../db/sqliteWrapper');

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

/* GET upload handler. */
router.get('/', asyncMiddleware(async (req, res, next) => {

  console.log("got the get request");

  let bookName = req.query.name;
  let dbFile = req.query.dbfile;

  console.log("bookname and db file", bookName, dbFile);

  console.log("+++++++++++ QUERY +++++++++", req.query);

  if (!bookName || !dbFile) {
      logger.error("[BOOK-RESULT] Required information are empty!");
      res.send("Required information are empty!");
  }

  console.log("+++++++++++ TEST +++++++++", bookName);

  logger.info('[BOOK-RESULT] Preparing the result from file for book  started.');


  res.render('result', {
    title: 'Results'
  });
}));

module.exports = router;