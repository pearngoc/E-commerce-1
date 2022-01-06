const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema(
  {
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cart: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        qty: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
