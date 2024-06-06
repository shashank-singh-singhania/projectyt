import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const url  = process.env.MONGODB_URI

const connectMongoDB = async()=>{
    try {
        
        // await mongoose.connect("mongodb+srv://brockzmr5:brockzmr5@cluster0.ya4dnzs.mongodb.net/yt_db")
        // await mongoose.connect("mongodb://127.0.0.1:27017/yt_db")
        await mongoose.connect("mongodb+srv://xinghania:singh007@cluster0.b80voje.mongodb.net/yt_db?retryWrites=true&w=majority&appName=Cluster0")
        // await mongoose.connect(url)
        console.log("Connected To MongoDB")
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB
