
var express = require('express');
var router = express.Router();
var cartController = require('./cartController')

/* GET home page. */
router.get('/', cartController.show);
router.get('/add-to-cart/:id', cartController.addToCart);
router.get('/reduce/:id', cartController.removeItem);
router.get('/insert/:id', cartController.insertItem);

module.exports = router;
