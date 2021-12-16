const Product = require('./productModel')


class Course{
    show(skip, page_size) {
        return Product.find({})
               .skip(skip)
               .limit(page_size)               
    }

    showAll(){
        return Product.find({})
    }

    showProductDetail(id){
        return Product.findOne({ _id: id })
    }

    countDocuments(){
        return Product.countDocuments({})
    }

    
}

module.exports = new Course();