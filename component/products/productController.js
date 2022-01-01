const productService = require("./productService");
const queryUtils = require("../../utils/queryUtils");
const PAGE_SIZE = 8;
class CourseController {
  async show(req, res) {
    let { page, category, sortBy, sortPrice, q } = req.query;
    let products;

    const queryObject = queryUtils.generateQueryObject(
      category,
      sortBy,
      sortPrice,
      q
    );

    if (page) {
      page = parseInt(page);
      if (page < 1) page = 1;
      const skip = (page - 1) * PAGE_SIZE;
      products = await productService.show(skip, PAGE_SIZE, queryObject);
      var total = await productService.countDocuments();

      switch (sortBy) {
        case "view":
          products.sort((a, b) => b.view - a.view);
          break;
        case "newness":
          products.sort((a, b) => a.createdAt - b.createdAt);
          break;
        case "priceAsc":
          products.sort((a, b) => a.price - b.price);
          break;
        case "priceDesc":
          products.sort((a, b) => b.price - a.price);
          break;

        default:
          break;
      }

      res.json({
        sumPage: total,
        products: products,
      });
    } else {
      products = await productService.showAll();
      res.json(products);
    }
    //res.render('product/products', { products: mutipleMongooseToObject(products) });
  }

  async showDetail(req, res) {
    const product = await productService.showProductDetail(req.params.id);
    const relatedProducts = await productService.getRelatedProducts(product);

    product.view = product.view + 1;
    await productService.updateView(req.params.id, product.view);
    res.render("products/views/productDetail", {
      product: product,
      relatedProducts,
    });
  }

  renderFile(req, res) {
    res.render("products/views/products", {});
  }
}

module.exports = new CourseController();
