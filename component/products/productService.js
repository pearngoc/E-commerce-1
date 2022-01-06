const Product = require("./productModel");

class Course {
  show(skip, page_size, queryObject = {}) {
    return Product.find(queryObject).skip(skip).limit(page_size).lean();
  }

  showAll(queryObject = {}) {
    return Product.find(queryObject);
  }

  showProductDetail(id) {
    return Product.findOne({ _id: id }).lean();
  }

  getTop10ProductsBySold() {
    return Product.find({}).sort({ sold: "desc" }).limit(10).lean();
  }

  async getRelatedProducts(product) {
    const relatedProducts = await Product.find({
      $and: [
        {
          category: {
            $in: product.category,
          },
        },
        {
          _id: {
            $ne: product._id,
          },
        },
      ],
    })
      .limit(10)
      .lean();

    return relatedProducts;
  }

  countDocuments() {
    return Product.countDocuments({});
  }

  updateView(id, view) {
    return Product.updateOne({ _id: id }, { $set: { view: view } });
  }
}

module.exports = new Course();
