var express = require('express');
var router = express.Router();
const productController = require('./productController')

/* GET home page. */
router.get('/', productController.renderFile);
router.get('/pagination', productController.show);
router.get('/:id', productController.showDetail);

module.exports = router;
