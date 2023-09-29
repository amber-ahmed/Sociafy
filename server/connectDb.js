import mongoose from "mongoose";
import config from "config";
async function dbConnect(){
    try{
        await mongoose.connect(config.get('DB_URI'))
        console.log('connected to db')
    }catch(error){
        console.log(error)
    }
}
dbConnect()
export default dbConnect