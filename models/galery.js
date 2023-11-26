import mongoose from 'mongoose'


const galerySchema = new mongoose.Schema({
    name:{
        type: String
    },
    products:
        {
            required:false,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ,
    images: [
        {
            secure_url: String,
            public_id: String
        },
    ]

    
    
}, {timestamps: true})

export default mongoose.model('galery', galerySchema)