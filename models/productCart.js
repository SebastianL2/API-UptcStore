const mongoose = require('mongoose')
const {Schema} = mongoose

const productCartSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity:{
        type: Number,
        required: true
    },
    unitPrice:{
        type: Number,
        required: true
    },
    subTotal:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('productCart', productCartSchema)