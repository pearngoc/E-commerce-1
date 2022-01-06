var express = require("express");
var router = express.Router();
const cartModel = require("../component/cart/cartModel");
const productService = require("../component/products/productService");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let top10Products = await productService.getTop10ProductsBySold();
  if (req.user) {
    const carts = await cartModel.findOne({ customerID: req.user.id });

    let totalItem = 0;

    if (carts) {
      for (let item of carts.cart) {
        totalItem += item.qty;
      }
    }
    if (req.session.cart) {
      for (let otherI in req.session.cart.items) {
        totalItem += req.session.cart.items[otherI].qty;
      }
    }
    req.user.totalItem = totalItem;
  }

  res.render("index", {
    top10Products,
  });
});

module.exports = router;
