var express = require('express');
const { getEmail } = require('../component/authentication/authController');
var router = express.Router();
var userModel = require('../component/authentication/userModel')
/* GET home page. */
router.put('/:id', async function(req, res, next){
  //res.json(req.body);
  let message;
  const username = await userModel.find({username: req.body.username}).lean();
  const email = await userModel.find({email: req.body.email}).lean();
  console.log(email)
  if(username.length === 1 && username[0]._id.toString() !== req.user.id){
    message = "Username is exists. Please choose another username!";
  }else if(email.length === 1 && email[0]._id.toString() !== req.user.id){
    message = "Email is exists. Please choose another email!"
  }else if(req.body.phoneNumber.length < 10 || req.body.phoneNumber.length > 11){
    message = "Phone number is not correct. Please enter phone number again!"
  }

  if(message){
      res.render('profile', {message});
  }
  else{
    userModel.updateOne({_id: req.params.id}, req.body)
          .then(()=> {
            req.session.passport.user.username = req.body.username;
            req.session.passport.user.email = req.body.email;
            req.session.passport.user.phone = req.body.phoneNumber;
            req.session.passport.user.address = req.body.address;   
            res.redirect('/me')         
          })
          .catch(next);
  }
  //res.redirect('/me') 
})

router.get('/', function(req, res, next){
  res.render('profile')
})


module.exports = router;
