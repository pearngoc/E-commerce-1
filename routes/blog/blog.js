var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog/blog', { title: 'Blog' });
});

router.get('/:id', function(req, res, next) {
  res.render('blog/blogDetail', { title: 'Blog Detail' });
});

module.exports = router;
