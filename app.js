import express from 'express' 
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from "morgan";
const app = express()
import fileUpload from 'express-fileupload'


import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import categoryRouter from './routes/category.js'
import productRouter from './routes/product.js'
import paymentRoutes from './routes/route_payment.js'
import galeryRouter from './routes/galery.js'

dotenv.config()
const corsOptions = {
    origin: true,
    credentials: true,
}

app.set('PORT', process.env.PORT)

mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.URLMONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!');
    } catch (error) {
        console.log('MongoDB connection error: ', error);

    }
}
connect()

app.use(express.json())
app.use(cors(corsOptions))
app.use(paymentRoutes);
// app.use(morgan("dev"));

app.listen(app.get('PORT'), ()=>{
    console.log(`Server listen to port: ${app.get('PORT')}` );
})



app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/products', productRouter)
app.use('/galery', galeryRouter)
app.use('/auth', authRouter)



