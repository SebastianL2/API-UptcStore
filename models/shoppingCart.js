const mongoose = require('mongoose')
const { Schema } = mongoose

const shoppingCartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productsCart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productCart'
        }
    ],
    total: {
        type: Number,
        required: true
    }
}
)

module.exports = mongoose.model('shoppingCart', shoppingCartSchema)