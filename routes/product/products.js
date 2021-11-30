var express = require('express');
var router = express.Router();
const productController = require('../../component/products/productController')

/* GET home page. */
router.get('/', productController.show);
router.get('/:id', productController.showDetail);

/* GET home page. */
// router.get('/:id', function(req, res, next) {
//   res.render('product/productDetail', { title: 'Product' });
// });

module.exports = router;
