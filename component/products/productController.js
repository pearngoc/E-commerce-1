const productService = require('./productService')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class CourseController{
    async show(req, res, next){
        const products = await productService.show();
        res.render('product/products', { products: mutipleMongooseToObject(products) });
    }
}

module.exports = new CourseController();