const express = require('express')
const router = express.Router()
const {createShoppingCart, addProductCartToShoppingCart, getShoppingCart}= require('../controllers/controll_shoppingCart')

router.post('/:userId', createShoppingCart)
router.post('/', addProductCartToShoppingCart ) 
router.get('/:userId', getShoppingCart)

module.exports = router