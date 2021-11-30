const productService = require('./productService')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')


class CourseController{
    async show(req, res, next){
        const products = await productService.show();
        res.render('product/products', { products: mutipleMongooseToObject(products) });
    }

    async showDetail(req, res, next){
        const product = await productService.showProductDetail(req.params.id)
        res.render('product/productDetail', { product: mongooseToObject(product) })
    }
}

module.exports = new CourseController();