import connectMongoDB from "@/libs/mongodb"
// import Video from "@/models/video.model"
import Playlist from "@/models/playlist.model"
import { NextResponse } from "next/server"

export async function PUT(request:any,{params}:any) {
    const {id} = params
    const {newTitle:title, newLink:link, newImg:img} = await request.json()

    await connectMongoDB()
    await Playlist.findByIdAndUpdate(id,{title, link,img})
    return NextResponse.json({message:"Playlist updated"})
}



export async function GET(request:any,{params}:any) {
    const {id} = params
    // const {newTitle:title, newDescription:description, newImg:img} = await request.json()

    await connectMongoDB()
    const playlist = await Playlist.findOne({_id:id})
    return NextResponse.json({playlist})
}



