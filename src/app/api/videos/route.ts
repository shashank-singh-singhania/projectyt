import connectMongoDB from "@/libs/mongodb"
import Video from "@/models/video.model"
import { NextResponse } from "next/server"

export async function POST(request:any) {
    const {title, description,img,videoLink} = await request.json()
    await connectMongoDB()
    await Video.create({title,description,img,videoLink})
    return NextResponse.json({message:"Video Added to DB"})
}


export async function GET() {
    await connectMongoDB()
    const Videos = await Video.find()
    return NextResponse.json({Videos})
}


export async function DELETE(request:any) {
    const Id = request.nextUrl.searchParams.get("id")
    await connectMongoDB()
    await Video.findByIdAndDelete(Id)
    return NextResponse.json({message:"Video Deleted"})
}