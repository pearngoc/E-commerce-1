
const Comment = require("./commentModel")
class Course {
  
  showComment(id) {
    return Comment.find({ productID: id }).lean();
  }
  async comment({ productID, userID, content }) {
    
    var cm = new Comment({
      productID: productID,
      userID: userID,
      content: content,
    });

    cm.save((err, doc) => {
      if (!err) {
        return true;
      } else return false;
    });
  }
}

module.exports = new Course();
