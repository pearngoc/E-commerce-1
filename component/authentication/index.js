var express = require('express')
const passport = require('../../passport')
var router = express.Router();

const authController = require('./authController')
router.get('/login', authController.login);
router.post('/login', passport.authenticate('local', { 
                    successRedirect: '/',
                    failureRedirect: '/login?wrong',}));
                    // failureFlash: true }))
router.get('/logout', authController.logout)
router.post('/register', authController.register)
router.get('/register', authController.renderRegister )
router.get('/google', passport.authenticate('google',{scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);module.exports = router