var express = require('express');
var router = express.Router();
var logger = require('./../logger/log');

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info("Index.js get request");

  res.render('index', { title: 'Simple Kindle Extractor' });
});

module.exports = router;
