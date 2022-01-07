const orderSchema = require('./ordersSchema')
const cartSchema = require('../cart/cartModel')
const ordersService = require('./ordersService')
const productSchema = require('../products/productModel')
const PAGE_SIZE = 4
exports.checkOut = async (req, res) => {
  if(!req.user){
    res.json({message: ''})
  }else{
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
      res.json({ message1: 'Information can not empty' })
    } else if (phoneNumber.length < 10 || phoneNumber.length > 11) {
      res.json({ message1: 'Phone number is invalid' })
    }
    if (!paypal && (!card_number || !expiry_date || !cvc)) {
      res.json({ message: 'Information payment cannot empty!' })
    } else if (card_number && expiry_date && cvc) {
      if (card_number.length != 16) {
        res.json({ message: 'Card number is not correctly!' })
      } else if (expiry_date.length != 5) {
        res.json({ message: 'Expiry date is not correctly!' })
      } else if (cvc.length != 3) {
        res.json({ message: 'CVC/CVV is not correctly!' })
      }
    } else {
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
      cart.forEach(async (element) => {
        const product = await productSchema.findOne({ _id: element.productID })
        const sold = product.sold + element.qty
        const inStock = product.inStock - element.qty
        await productSchema.findOneAndUpdate(
          { _id: element.productID },
          { $set: { sold: sold, inStock: inStock } }
        )
      })
      const orders = await order.save()
      console.log(orders._id.toString())
      await cartSchema.findOneAndDelete({ _id: idCart })
  
      res.json({ success: orders._id.toString() })
    }
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
