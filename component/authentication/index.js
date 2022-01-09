var express = require('express')
const passport = require('../../passport')
const checkActive = require('../../middleware/checkActive')
const loggerOutUserGuard = require('../../middleware/loggerOutUserGuard')
var router = express.Router()

const authController = require('./authController')
router.get('/login',loggerOutUserGuard, authController.login)
router.post(
  '/login',
  checkActive,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
)
// failureFlash: true }))
router.get('/logout', authController.logout)
router.post('/register',loggerOutUserGuard, authController.register)
router.get('/register',loggerOutUserGuard, authController.renderRegister)
router.get('/register/activate',loggerOutUserGuard,  authController.activate)
router.get('/reset-password', authController.renderUIReset)
router.post('/reset-password', authController.getEmail)
router.get('/forgot-password',loggerOutUserGuard, authController.forgotPassword)
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)
router.get('/active-message',loggerOutUserGuard, authController.activateMessage)
module.exports = router
