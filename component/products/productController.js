const productService = require('./productService')


class CourseController{
    show(req, res, next){
        const products = productService.show();
        res.render('product/products', { products });
    }
}