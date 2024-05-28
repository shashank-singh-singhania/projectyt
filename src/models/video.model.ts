import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
    {
        title: String,
        description: String,
        img:String,
        videoLink:String,
    }
)

const Video = mongoose.models.Video || mongoose.model("Video",videoSchema)

export default Video