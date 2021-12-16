var Product = require('../products/productModel')
module.exports.findProduct = (id)=>{
    return Product.findById({_id: id});
}