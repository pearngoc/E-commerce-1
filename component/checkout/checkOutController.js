const checkOutServices = require('./checkOutServices')
exports.checkOut = async (req, res) => {
  let boolean = true
  if (req.user) {
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
      boolean = false
      res.json({ message1: 'Information can not empty' })
    } else if (phoneNumber.length < 10 || phoneNumber.length > 11) {
      boolean = false
      res.json({ message1: 'Phone number is invalid' })
    }
    if (!paypal && (!card_number || !expiry_date || !cvc)) {
      boolean = false
      res.json({ message: 'Information payment cannot empty!' })
    } else if (card_number && expiry_date && cvc) {
      if (card_number.length != 16) {
        boolean = false
        res.json({ message: 'Card number is not correctly!' })
      } else if (expiry_date.length != 5) {
        boolean = false
        res.json({ message: 'Expiry date is not correctly!' })
      } else if (cvc.length != 3) {
        boolean = false
        res.json({ message: 'CVC/CVV is not correctly!' })
      }
    }
    if (boolean) {
      let paymentType, detailPayment
      if (paypal) {
        paymentType = 'Paypal'
        detailPayment = paypal
      } else if (card_number) {
        paymentType = 'Credit card'
        detailPayment = card_number
      }

      const id = await checkOutServices.createOrder(req.user, cart, address, phoneNumber, paymentType, detailPayment)
      await checkOutServices.updateProduct(cart)
      await checkOutServices.updateCart(idCart)

      res.json({ success: id })
    }
  } else {
    res.json({ message2: '' })
  }
}
