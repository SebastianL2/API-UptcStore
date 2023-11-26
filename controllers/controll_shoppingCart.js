const shoppingCart = require('../models/shoppingCart')

module.exports = {
    createShoppingCart: async (req, res) => {
        try {
            const userId = req.params.userId
            const ShoppingCartJson = {
                "user": userId,
                "productsCart": [],
                "total": 0
            }
            const ShoppingCart = new shoppingCart(ShoppingCartJson)
            const ShoppingCartSave = await ShoppingCart.save()
            return res.status(200).json({
                "status": true,
                "ShoppingCartSave": ShoppingCartSave
            })
        } catch (error) {
            return res.status(500).json({
                "status": false,
                "error": error
            })
        }
    }, addProductCartToShoppingCart: async (req, res) => {
        try {
            const { userId, productsCartId } = req.body
            console.log(userId, productsCartId);
            const ShoppingCart = await shoppingCart.findOne({ user: userId })
            // console.log(ShoppingCart);
            ShoppingCart.productsCart.push(productsCartId)
            const updateShoppingCart = await ShoppingCart.save()
            console.log(updateShoppingCart);
            return res.status(200).json({
                "status": true,
                "updateShoppingCart": updateShoppingCart
            })
        } catch (error) {
            return res.status(500).json({
                "status": false,
                "error": error.message
            })
        }
    }, getShoppingCart: async (req, res) => {
        try {
            const userId = req.params.userId;
            const ShoppingCart = await shoppingCart.findOne({ user: userId }).populate('productsCart');
            if (!ShoppingCart) {
                return res.status(404).json({
                    status: false,
                    message: 'Carrito de compras no encontrado'
                });
            }
            let total = 0
            for (const productCart of ShoppingCart.productsCart) {
                total += productCart.subTotal
            }
            ShoppingCart.total = total
            const shoppingCartSave = await ShoppingCart.save()
            return res.status(200).json({
                status: true,
                "shoppingCart": shoppingCartSave
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            });
        }
    }
}