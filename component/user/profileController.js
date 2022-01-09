var express = require('express')
//const { getEmail } = require('../authentication/authController');
var router = express.Router()
//const userModel = require('../authentication/userModel')
const profileService = require('./profileService')
const userService = require('../authentication/userService')
/* GET home page. */
exports.changeProfile = async function (req, res, next) {
  const {id, username, email, phone, address}  = req.body
  let flag = false;
  const usernames = await profileService.findByUsername(username)
  const emails = await profileService.findByEmail(email)
  if (usernames.length === 1 && usernames[0]._id.toString() !== id) {
    flag = true;
    res.json({message: 'Username is exists. Please choose another username!'})
  } else if (emails.length === 1 && emails[0]._id.toString() !== id) {
    flag = true;
    res.json({ message: 'Email is exists. Please choose another email!'})
  } else if (phone) {
    if (phone.length < 10 || phone.length > 11){
      flag = true;
      res.json({message: 'Phone number is not correct. Please enter phone number again!'})
    }
  }

  if (!flag) {
    const user = await profileService.updateUser(id, req.body)
    if (user) {
      req.session.passport.user.username = username
      req.session.passport.user.email = email
      req.session.passport.user.phone = phone
      req.session.passport.user.address = address
      res.json({message: ""})
    } else {
      next()
    }
  }
}

exports.changePassword = async function (req, res, next) {  
  const {id, password, new_password, re_new_password}  = req.body
  const user = await profileService.findById(id)
  const flag = await userService.validPassword(password, user[0])
  if (!password || !new_password || !re_new_password) {
    res.json({message: 'Please enter all fields'})
  } else if (new_password.length < 6) {
    res.json({message: 'New Password must be at least 6 characters'})
  } else if (!flag) {
    res.json({message: 'Password is not correct. Please enter password again!'})
  } else if (new_password !== re_new_password) {
    res.json({message: 'New password do not match'})
  } else {
    res.json({message: ''})
    await userService.updatePassword(id, '', new_password)
  }

  //res.redirect('/me/change-password');
}

exports.showProfile = function (req, res, next) {
  res.render('user/views/profile')
}

exports.showChangePassword = function (req, res) {
  res.render('user/views/change-password')
}
