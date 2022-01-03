var express = require('express');
//const { getEmail } = require('../authentication/authController');
var router = express.Router();
//const userModel = require('../authentication/userModel')
const profileService = require('./profileService')
const userService = require('../authentication/userService')
/* GET home page. */
exports.changeProfile =  async function(req, res, next){
  let message;
  const username = await profileService.findByUsername(req.user.username);
  const email = await profileService.findByEmail(req.user.email);
  if(username.length === 1 && username[0]._id.toString() !== req.user.id){
    message = "Username is exists. Please choose another username!";
  }else if(email.length === 1 && email[0]._id.toString() !== req.user.id){
    message = "Email is exists. Please choose another email!"
  }else if(req.body.phoneNumber){
    if(req.body.phoneNumber.length < 10 || req.body.phoneNumber.length > 11)
      message = "Phone number is not correct. Please enter phone number again!"
  }

  if(message){
      res.render('user/views/profile', {message});
  }
  else{
    const user = profileService.updateUser(req.params.id, req.body);
    if(user){
      req.session.passport.user.username = req.body.username;
      req.session.passport.user.email = req.body.email;
      req.session.passport.user.phone = req.body.phoneNumber;
      req.session.passport.user.address = req.body.address;   
      res.redirect('/me')    
    }else{next()}     
  }
  //res.redirect('/me') 
}

exports.changePassword = async function(req, res, next){
    let message, success;
    const user = await profileService.findById(req.user.id);

    const oldPassWord = req.body.password;
    const newPassWord = req.body.new_password;
    const reNewPassWord = req.body.re_new_password;

    if(!oldPassWord || !newPassWord || !reNewPassWord){
        message = "Please enter all fields"
    }else if(newPassWord.length < 6){
       message = "New Password must be at least 6 characters";
    }else if(!userService.validPassword(oldPassWord, user)){
       message = "Password is not correct. Please enter password again!";
    }else if(newPassWord !== reNewPassWord){
       message = "New password do not match";
    }else{
      success = "Password updated successfully!"
      await userService.updatePassword(req.user.id, "", newPassWord);
    }

    //res.redirect('/me/change-password');
    res.render('user/views/change-password', {message, success});
   
    
}

exports.showProfile = function(req, res, next){
  res.render('user/views/profile')
}

exports.showChangePassword = function(req, res){
  res.render('user/views/change-password');
}

