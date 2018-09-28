var express = require('express');
var router = express.Router();

/* POST upload handler. */
router.post('/', function(req, res, next) {
  // upload logic here
  console.log("upload handler");
  res.send("got POST to uplaod");
});

module.exports = router;
