const productCart = require('../models/productCart')

module.exports = {
    addProductToCart: async (req, res) => {
        try {
            const { productId, quantity, unitPrice } = req.body
            const userId = req.params.idUser
            //console.log(productId, quantity, unitPrice, userId);
            let productInCart = await productCart.findOne({ user: userId, products: productId })
            if (productInCart) {
                productInCart.quantity = quantity
                productInCart.subTotal = productInCart.quantity * unitPrice
            } else {
                productInCart = new productCart({
                    user: userId,
                    products: productId,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    subTotal: quantity * unitPrice
                })
            }
            const productSaveInCart = await productInCart.save()
            return res.status(200).json({
                "status": true,
                "message": 'Producto agregado al carrito',
                "data": productSaveInCart
            })
        } catch (error) {
            return res.status(500).json({
                "status": false,
                "error": error.message
            })
        }
    }, getCartProducts: async (req, res) => {
        try {
            const userId = req.params.idUser
            const cartProducts = await productCart.find({ user: userId }).populate('products')
            return res.status(200).json({
                "status": true,
                "cartProducts": cartProducts
            })
        } catch (error) {
            return res.status(500).json({
                "status": false,
                "error": error
            })
        }
    }, 
    deleteProductFromCart: async(req, res)=>{
        try {
            const idProductCart = req.params.idProduct
            //console.log(idProductCart);
            const productDeleted = await productCart.findByIdAndDelete(idProductCart)
            //console.log(productDeleted);
            return res.status(200).json({
                "status": true, 
                "productDeletedFromCart": productDeleted
            })
        } catch (error) {
            return res.status(500).json({
                "status": false,
                "error": error.message
            })
        }
    }
}