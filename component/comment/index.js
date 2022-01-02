var express = require('express');
var router = express.Router();
const commentController = require('./commentController')

/* GET home page. */

router.post('/postComment', commentController.postComment);
module.exports = router;
