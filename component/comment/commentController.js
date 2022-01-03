const commentService = require("./commentService");
const queryUtils = require("../../utils/queryUtils");
const PAGE_SIZE = 8;
class CourseController {
  
  async postComment(req,res){
    if(req.user){
      const { productID, userID, content } = req.body;
    await commentService.comment({ productID, userID, content });
    res.status(201).json(productID);
    }
    else {
      res.redirect('/login'); 
    }
  }
}

module.exports = new CourseController();
