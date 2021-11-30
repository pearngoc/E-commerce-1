const Product = require('../../models/product')

class Course{
    show() {
        return Product.find({})
    }

    showProductDetail(id){
        return Product.findOne({ _id: id })
    }
}

module.exports = new Course();