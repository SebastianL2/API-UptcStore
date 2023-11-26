import mongoose from "mongoose";

const URLMongo = process.env.URLMongo

const options={
    useNewUrlParser : true,
    useUnifiedTopology: true
}

mongoose.connect(URLMongo, options).then(()=>{
    console.log('Successfully connected to the database ');
}).catch((error)=>{
    console.log('Error connected to the database', error);
})
export default mongoose

