import mongoose from "mongoose";

const connectMongoDB = async()=>{
    try {
        
        // await mongoose.connect("mongodb+srv://brockzmr5:brockzmr5@cluster0.ya4dnzs.mongodb.net/yt_db")
        await mongoose.connect("mongodb://127.0.0.1:27017/yt_db")
        console.log("Connected To MongoDB")
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB