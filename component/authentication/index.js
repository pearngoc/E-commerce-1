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
module.exports = router