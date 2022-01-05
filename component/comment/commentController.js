const commentService = require("./commentService");
const queryUtils = require("../../utils/queryUtils");
const PAGE_SIZE = 8;
class CourseController {
  async getComment(req,res){
    
    const productID = req.body.productID;
    const page = req.body.page;
    const perPage = req.body.perPage;
    const comments = await commentService.getCommentPerPage(page,perPage,productID);
   
    res.status(201).json(comments);
  }
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
