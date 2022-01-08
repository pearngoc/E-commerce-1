const orderSchema = require('./ordersSchema')
const cartSchema = require('../cart/cartModel')
const ordersService = require('./ordersService')
const productSchema = require('../products/productModel')
const PAGE_SIZE = 4


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
