const express = require('express')
const router = express.Router()

const {processPayment}= require('../controllers/controll_payment')

router.post('/', processPayment)

module.exports = router