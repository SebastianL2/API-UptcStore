import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
    
    name: {
        type: String,
        
    },
    lastname:{
        type: String,
        
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        
    },
    phone:{
        type: Number,
        
    },
    photo:{
        secure_url: String,
        public_id: String
    },
    city:{
        type: String,
        
    },
    role: {
        type: String,
        enum: ['customer', 'admin','seller'],
        default: 'customer',
    }

}, {timestamps: true})

export default mongoose.model('User', userSchema)