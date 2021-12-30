const userModel = require('../authentication/userModel');
const Cart = require('./cartModel')
const cartService = require('./cartService')
module.exports.addToCart = async(req, res) => {
    var productId = req.params.id;
    
    
    const product = await cartService.findProduct(productId);
    if(req.user){
        await cartService.addItemToCart(req.user,product, productId);
        
    }else{
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
    }
    res.redirect('/products');    
}

module.exports.removeItem =  async (req, res)=>{
    var productId = req.params.id;
    if(req.user){
        await cartService.deleteOneItem(req.user, productId);   
    }else{
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduceByOne(productId);
        req.session.cart = cart;
    }
    res.redirect('/cart');
}


module.exports.insertItem = async (req, res)=>{
    var productId = req.params.id;
    if(req.user){
        await cartService.insertOneItem(req.user, productId);   
    }
   else{
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.addByOne(productId);
    req.session.cart = cart;
   }
   res.redirect('/cart')
    
}

module.exports.show = async(req, res)=>{
    if(!req.user){
        if(!req.session.cart){
            return res.render('cart/views/cart', {products: null})
        }
        
        var cart = new Cart(req.session.cart);
        console.log(cart.generateArray());
        res.render('cart/views/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
    }else{
        const products = await userModel.find({_id: req.user.id})
        res.render('cart/views/cart',{products: products[0].cart, totalPrice: products[0].totalPrice});
    }
    
}