const Cart = require('./cartUtils')
const cartService = require('./cartService')
const cartModel = require('./cartModel')
const productService = require('../products/productModel')
module.exports.addToCart = async (req, res) => {
  var productId = req.params.id
  if (req.user) {
    req.user.totalItem += 1
    await cartService.addItemToCart(req.user, productId)
  } else {
    const product = await productService.findOne({ _id: productId })
    var cart = new Cart(req.session.cart ? req.session.cart : {})
    cart.add(product, productId)
    req.session.cart = cart
  }
  res.redirect('/products')
}

module.exports.addToCartFromDetail = async (req, res) => {
  var productId = req.params.id
  if (req.user) {
    req.user.totalItem += 1
    await cartService.addItemToCart(req.user, productId)
  } else {
    const product = await productService.findOne({ _id: productId })
    var cart = new Cart(req.session.cart ? req.session.cart : {})
    cart.add(product, productId)
    req.session.cart = cart
  }
  res.redirect(`/products/${productId}`)
}

module.exports.removeItem = async (req, res) => {
  var productId = req.params.id
  if (req.user) {
    req.user.totalItem -= 1
    await cartService.deleteOneItem(req.user, productId)
  } else {
    var cart = new Cart(req.session.cart ? req.session.cart : {})
    cart.reduceByOne(productId)
    req.session.cart = cart
  }

  res.redirect('/cart')
}

module.exports.insertItem = async (req, res) => {
  var productId = req.params.id
  if (req.user) {
    req.user.totalItem += 1
    await cartService.insertOneItem(req.user, productId)
  } else {
    var cart = new Cart(req.session.cart ? req.session.cart : {})
    cart.addByOne(productId)
    req.session.cart = cart
  }
  res.redirect('/cart')
}

module.exports.show = async (req, res) => {
  if (!req.user) {
    if (!req.session.cart) {
      return res.render('cart/views/cart', { products: null })
    }

    var cart = new Cart(req.session.cart)
    res.render('cart/views/cart', {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
    })
  } else {
    if (req.session.cart) {
      const carts = await cartService.findCustomer(req.user.id)
      if (carts) {
        const cartSessionTemp = cartService.convertArrayForSessionCart(
          req.session.cart.items
        )
        //console.log(carts)
        await cartService.synchCart(carts, req.user, cartSessionTemp)
        //console.log(cartSessionTemp);
      } else {
        const cartSession = cartService.convertArrayForSessionCart(
          req.session.cart.items
        )
        await cartService.createCart(req.user, cartSession)
      }
      req.session.cart = false
    }
    const carts = await cartService.findCart(req.user)
    if (!carts) {
      return res.render('cart/views/cart', { products: null })
    } else {
      const products = cartService.convertArray(carts)
      const cart = cartService.convertCart(carts)
      const totalPrice = cartService.totalPrice(products)
      res.render('cart/views/cart', {
        products: products,
        totalPrice: totalPrice,
        cart: cart,
        idCart: carts._id,
      })
    }
  }
}

exports.reduceElement = async (req, res) => {
  const { productID, qty } = req.body

  if (req.user) {
    req.user.totalItem -= qty
    await cartService.removeItem(req.user, productID)
  } else {
    console.log(req.session.cart)
    req.session.cart.totalQty -= req.session.cart.items[productID].qty
    req.session.cart.totalPrice -= req.session.cart.items[productID].price
    delete req.session.cart.items[productID]
  }
  res.redirect('/cart')
}
