const orderSchema = require('./ordersSchema')
const cartSchema = require('../cart/cartModel')
const ordersService = require('./ordersService')
const PAGE_SIZE = 4
exports.checkOut = async (req, res) => {
  let {
    cart,
    idCart,
    phoneNumber,
    address,
    paypal,
    card_number,
    expiry_date,
    cvc,
  } = req.body
  cart = JSON.parse(cart)

  if (!phoneNumber || !address) {
    req.session.error = "Information can't empty"
    res.redirect('/cart')
  } else if (!paypal && (!card_number || !expiry_date || !cvc)) {
    req.session.error2 = 'Information payment cannot empty!'
    res.redirect('/cart')
  } else if (card_number && expiry_date && cvc) {
    if (card_number.length != 16) {
      req.session.error2 = 'Card number is not correctly!'
      res.redirect('/cart')
    } else if (expiry_date != 5) {
      req.session.error2 = 'Expiry date is not correctly!'
      res.redirect('/cart')
    } else if (cvc.length != 3) {
      req.session.error2 = 'CVC/CVV is not correctly!'
      res.redirect('/cart')
    }
  }

  let paymentType, detailPayment
  if (paypal) {
    paymentType = 'Paypal'
    detailPayment = paypal
  } else if (card_number) {
    paymentType = 'Credit card'
    detailPayment = card_number
  }

  const order = new orderSchema({
    customerId: req.user.id,
    items: cart,
    address: address,
    phone: phoneNumber,
    paymentType: paymentType,
    detailPayment: detailPayment,
  })
  req.user.totalItem = 0
  const result = await order.save()
  await cartSchema.findOneAndDelete({ _id: idCart })

  if (result) {
    res.redirect('/me/orders')
  } else {
    res.redirect('/cart')
  }
}

exports.showOrders = async (req, res) => {
  res.render('user/views/ordersList')
}

exports.showDetail = async (req, res) => {
  const billDetails = await orderSchema
    .find({ _id: req.params.id })
    .populate('items.productID')
    .populate('customerId')
  const totalPrice = ordersService.totalPrice(billDetails[0].items)
  const totalItem = ordersService.totalItem(billDetails[0].items)
  const billDetail = ordersService.convertArrayDetail(
    billDetails,
    totalPrice,
    totalItem
  )

  res.render('user/views/orderDetail', { billDetail })
}

exports.getOrdersPage = async (req, res) => {
  let { page } = req.query
  let orders

  if (page) {
    page = parseInt(page)
    if (page < 1) page = 1
    const skip = (page - 1) * PAGE_SIZE
    orders = await ordersService.show(skip, PAGE_SIZE, req.user)
    var total = await ordersService.countDocuments(req.user)

    res.json({
      sumPage: total,
      orders: orders,
    })
  }
}
