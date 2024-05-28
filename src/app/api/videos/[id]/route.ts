import connectMongoDB from "@/libs/mongodb"
import Video from "@/models/video.model"
import { NextResponse } from "next/server"

export async function PUT(request:any,{params}:any) {
    const {id} = params
    const {newTitle:title, newDescription:description, newImg:img} = await request.json()

    await connectMongoDB()
    await Video.findByIdAndUpdate(id,{title, description,img})
    return NextResponse.json({message:"Video updated"})
}



export async function GET(request:any,{params}:any) {
    const {id} = params
    // const {newTitle:title, newDescription:description, newImg:img} = await request.json()

    await connectMongoDB()
    const video = await Video.findOne({_id:id})
    return NextResponse.json({video})
}



