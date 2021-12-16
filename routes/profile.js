var express = require('express');
var router = express.Router();
var userModel = require('../component/authentication/userModel')
/* GET home page. */
router.put('/:id', function(req, res, next){
  //res.json(req.body);
  userModel.updateOne({_id: req.params.id}, req.body)
          .then(()=> {
            req.session.passport.user.username = req.body.username;
            req.session.passport.user.email = req.body.email;
            req.session.passport.user.phone = req.body.phoneNumber;
            req.session.passport.user.address = req.body.address;
            console.log(req.body);
            res.redirect('/me')            
          })
          .catch(next);
})

router.get('/', function(req, res, next){
  res.render('profile')
})


module.exports = router;
