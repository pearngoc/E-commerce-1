var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('product/products', { title: 'Product' });
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('product/productDetail', { title: 'Product' });
});

module.exports = router;
