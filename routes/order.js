const express = require('express')
const router = express.Router()

const {obtainAll} = require('../controllers/controll_order')
router.get('/', obtainAll)

module.exports = router