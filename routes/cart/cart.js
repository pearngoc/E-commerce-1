var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cart/cart', { title: 'Cart' });
});

module.exports = router;
