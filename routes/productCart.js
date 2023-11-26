const express = require('express')
const router = express.Router()
const {addProductToCart,getCartProducts, deleteProductFromCart} = require('../controllers/controll_productCart')

router.get('/:idUser', getCartProducts)
router.post('/:idUser', addProductToCart)
router.delete('/:idProduct', deleteProductFromCart)

module.exports = router