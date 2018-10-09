var express = require('express');
var router = express.Router();
var logger = require('./../logger/log');

// Database
var db = require('./../db/sqliteWrapper');
var query = require('./../db/query')

// File Uploading Handler
var multer = require('multer');
var upload = multer({dest: 'uploaded-files/'})

/* POST upload handler. */
router.post('/', upload.single('dbfile'), function (req, res, next) {

    logger.info('[UPLOADING] Uploading file started.');

    var dbfile = req.file;

    logger.info('[UPLOADING] Uploading file', dbfile);

    db.getConnection(dbfile.path)
        .then(
            () => db.queryWordsByBookName(query.QUERY_WORDS_BY_BOOK, "The Idiot"),
        ).then(
            () => db.closeConnection(dbfile)
        );

    res.send("got POST to uplaod");
});

module.exports = router;