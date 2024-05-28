import connectMongoDB from "@/libs/mongodb"
// import Video from "@/models/video.model"
import Playlist from "@/models/playlist.model"
import { NextResponse } from "next/server"

export async function POST(request:any) {
    const {title, link,img} = await request.json()
    console.log(title,link,img)
    await connectMongoDB()
    await Playlist.create({title,link,img})
    return NextResponse.json({message:"Playlist Added to DB"})
}


export async function GET() {
    await connectMongoDB()
    const Playlists = await Playlist.find()
    return NextResponse.json({Playlists})
}


export async function DELETE(request:any) {
    const Id = request.nextUrl.searchParams.get("id")
    await connectMongoDB()
    await Playlist.findByIdAndDelete(Id)
    return NextResponse.json({message:"Playlist Deleted"})
}