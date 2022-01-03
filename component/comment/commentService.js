
const Comment = require("./commentModel")
const User = require("../authentication/userModel")
const mongoose = require("mongoose");
class Course {
  
  showComment(id) {
    return Comment.find({productID: id}).sort({"createdAt": -1}).populate({
      path: 'userID',
      select:
        'username avatar',
    });
  }
  async comment({ productID, userID, content }) {
    const user = await User.findOne({_id: mongoose.Types.ObjectId(userID)}).lean();
    console.log(user._id);
    var cm = new Comment({
      productID: productID,
      userID: user._id,
      content: content,
    });
    console.log(cm.userID);
    cm.save((err, doc) => {
      if (!err) {
        return true;
      } else return false;
    });
  }
}

module.exports = new Course();
