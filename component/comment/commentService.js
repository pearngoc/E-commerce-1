const Comment = require('./commentModel')
const User = require('../authentication/userModel')
const mongoose = require('mongoose')
class Course {
  showComment(id) {
    return Comment.find({ productID: id }).sort({ createdAt: -1 }).populate({
      path: 'userID',
      select: 'username avatar',
    })
  }
  getCommentPerPage(page, perPage, id) {
    return Comment.find({ productID: id })
      .skip((page - 1) * perPage)
      .limit(Number(perPage))
      .sort({ createdAt: -1 })
      .populate({
        path: 'userID',
        select: 'username avatar',
      })
      .lean()
  }
  async comment({ productID, userID, content }) {
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId(userID),
    }).lean()
    var cm = new Comment({
      productID: productID,
      userID: user._id,
      content: content,
    })
    console.log(cm.userID)
    cm.save((err, doc) => {
      if (!err) {
        return true
      } else return false
    })
  }
  async commentAnonymous({ productID, name, content }){
    var cm = new Comment({
      productID: productID,
      name: name,
      content: content,
    })
    console.log(cm.userID)
    cm.save((err, doc) => {
      if (!err) {
        return true
      } else return false
    })
  }
  countCommnet(id) {
    return Comment.find({ productID: id }).count()
  }
}

module.exports = new Course()
