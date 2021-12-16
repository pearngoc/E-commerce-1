const productService = require('./productService')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
const Cart =  require('../../public/js/cart')
const PAGE_SIZE = 8;
class CourseController{
    async show(req, res){
        let  page = req.query.page
        let products
        if(page){
            page = parseInt(page)
            if(page < 1) page = 1
            const skip = (page - 1) * PAGE_SIZE;
            products = await productService.show(skip, PAGE_SIZE)
            var total = await productService.countDocuments()
            
            res.json({
                sumPage: total,
                products: products
            })

        }else{
            products = await productService.showAll()
            res.json(products)
        }
        //res.render('product/products', { products: mutipleMongooseToObject(products) });
        
    }

    async showDetail(req, res){
        const product = await productService.showProductDetail(req.params.id)
        res.render('products/views/productDetail', { product: mongooseToObject(product) })
    }

    renderFile(req, res){
        res.render('products/views/products',{})
    }

    // async addToCart(req, res){
    //     var productId = req.params.id;
    //     var cart = new Cart(req.session.cart ? req.session.cart : {});

    //     const product = await productService.findProduct(productId);
    //     console.log(product);
    //     cart.add(product, product.id);
    //     req.session.cart = cart;
    //     console.log(req.session.cart);
    //     res.redirect('/products');
    // }

    // removeItem(req, res){
    //     var productId = req.params.id;
    //     var cart = new Cart(req.session.cart ? req.session.cart : {});

    //     cart.reduceByOne(productId);
    //     req.session.cart = cart;
    //     res.redirect('/cart');
    // }

   

    
}

module.exports = new CourseController();