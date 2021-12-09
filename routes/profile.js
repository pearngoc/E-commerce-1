var express = require('express');
var router = express.Router();
var userModel = require('../component/authentication/userModel')
/* GET home page. */
router.put('/:id', function(req, res, next){
  //res.json(req.body);
  userModel.updateOne({_id: req.params.id}, req.body)
          .then(()=> {
            res.locals.userNew = {id: req.params.id, ...req.body}
            res.redirect('/me')            
          })
          .catch(next);
})

router.get('/', function(req, res, next){
  res.render('profile')
})


module.exports = router;
