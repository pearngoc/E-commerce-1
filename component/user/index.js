var express = require('express');
var router = express.Router();
const profileController = require('./profileController')

router.get('/', profileController.showProfile);
router.get('/change-password', profileController.showChangePassword);
router.put('/change-password/:id', profileController.changePassword);
router.put('/:id', profileController.changeProfile);

module.exports = router
  