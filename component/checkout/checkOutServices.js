const orderSchema = require('../user/ordersSchema')
const cartSchema = require('../cart/cartModel')
const productSchema = require('../products/productModel')

exports.createOrder = async (user, cart, address, phoneNumber, paymentType, detailPayment) =>{
    const order = new orderSchema({
        customerId: user.id,
        items: cart,
        address: address,
        phone: phoneNumber,
        paymentType: paymentType,
        detailPayment: detailPayment,
    })

    user.totalItem = 0
    const orders = await order.save()

    return orders._id.toString();
}

exports.updateProduct = (cart) => {
    cart.forEach(async (element) => {
        const product = await productSchema.findOne({ _id: element.productID })
        const sold = product.sold + element.qty
        const inStock = product.inStock - element.qty
        await productSchema.findOneAndUpdate(
          { _id: element.productID },
          { $set: { sold: sold, inStock: inStock } }
        )
      })
}

exports.updateCart = async (idCart) => {
    await cartSchema.findOneAndDelete({ _id: idCart })
}