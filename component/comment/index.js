var express = require('express');
var router = express.Router();
const commentController = require('./commentController')

/* GET home page. */

router.post('/postComment', commentController.postComment);
router.post('/getComment', commentController.getComment);
module.exports = router;
