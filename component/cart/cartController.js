const Cart = require('./cartModel')
const cartService = require('./cartService')
module.exports.addToCart = async(req, res) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    const product = await cartService.findProduct(productId);
    //console.log(product);
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/products');
}

module.exports.removeItem = (req, res)=>{
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
}


module.exports.insertItem = (req, res)=>{
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.addByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
}

module.exports.show = (req, res)=>{
    if(!req.session.cart){
        return res.render('cart/views/cart', {products: null})
    }
    
    var cart = new Cart(req.session.cart);
    res.render('cart/views/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
}