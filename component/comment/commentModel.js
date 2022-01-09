const { create } = require('hbs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../authentication/userModel')
const commentSchema = new Schema(
  {
    productID: {
      type: String,
      require: true,
      //unique: true,
    },

    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {type: String},
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
