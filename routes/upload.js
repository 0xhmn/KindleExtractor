var express = require('express');
var router = express.Router();
var kindle = require('./../kindle');
var multer = require('multer');
var upload = multer({dest: 'result/'})

/* POST upload handler. */
router.post('/', upload.single('dbfile'), function (req, res, next) {
    console.log("upload handler");
    var dbfile = req.file;
    kindle.handleDbFile(dbfile);


    res.send("got POST to uplaod");
});

module.exports = router;