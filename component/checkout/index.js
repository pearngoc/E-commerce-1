var express = require('express')
var router = express.Router()
const checkOutController = require('./checkOutController')

router.post('/', checkOutController.checkOut)


module.exports = router
