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
        return Product.findOne({ _id: id }).lean();
    }

    countDocuments(){
        return Product.countDocuments({})
    }

    updateView(id, view){
        return Product.updateOne({_id: id}, {$set: {view: view}});
    }
}

module.exports = new Course();