import mongoose from 'mongoose'


const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required: true,
        trim: true 
    },
    description:{
        type: String,
        required: false,
    },
    products:[
        {
            required:false,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    options:[
        {
            type: String,
            required: false,
        }
    ]

    
    
}, {timestamps: true})

export default mongoose.model('Category', categorySchema)