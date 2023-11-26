import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false 
    },
    price:{
        type: Number,
        required: false 
    },
    images:{
      secure_url: String,
      public_id: String
    },
    stock:{
        type: Number,
        required: false 
    },
    availability: {
        type: Boolean,
        default: true,
    },    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    galery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'galery'
    },
    subcategory:{
        type: String,
        required: false 
    }
}, {timestamps: true})

export default mongoose.model('product', productSchema)