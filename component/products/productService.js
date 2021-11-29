const Product = require('../../models/product')

class Course{
    show() {
        return Product.find({})
    }
}

module.exports = new Course();