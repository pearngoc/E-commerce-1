const Product = require("./productModel");
const Commnet = require("./commentModel")
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
  showComment(id) {
    return Comment.find({ productID: id }).lean();
  }
  async comment({ productID, userID, content }) {
    
    var cm = new Commnet({
      productID: productID,
      userID: userID,
      content: content,
    });

    cm.save((err, doc) => {
      if (!err) {
        return true;
      } else return false;
    });
  }
}

module.exports = new Course();
