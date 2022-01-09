const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      //unique: true,
    },

    image: {
      type: Array,
      default: [],
    },

    thumbnail: {
      type: String,
      default: '',
    },

    price: {
      type: Number,
      default: 0,
      trim: true,
    },

    summary: {
      type: String,
      default: '',
    },

    inStock: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: '',
      require: true,
    },

    category: {
      type: Array,
      default: [],
    },

    view: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
