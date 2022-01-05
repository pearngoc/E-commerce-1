
var express = require('express');
var router = express.Router();
var cartController = require('./cartController')

/* GET home page. */
router.get('/', cartController.show);
router.get('/add-to-cart/:id', cartController.addToCart);
router.get('/add-to-cart/details/:id', cartController.addToCartFromDetail);
router.get('/reduce/:id', cartController.removeItem);
router.get('/insert/:id', cartController.insertItem);
router.post('/reduce-item', cartController.reduceElement);
module.exports = router;
