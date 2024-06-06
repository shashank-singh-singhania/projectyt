// import connectMongoDB from "@/libs/mongodb"
// import Video from "@/models/video.model"
// import { NextResponse } from "next/server"

// export async function POST(request:any) {
//     const {title, description,img,videoLink} = await request.json()
//     await connectMongoDB()
//     await Video.create({title,description,img,videoLink})
//     return NextResponse.json({message:"Video Added to DB"})
// }


// export async function GET() {
//     await connectMongoDB()
//     const Videos = await Video.find()
//     return NextResponse.json({Videos})
// }


// export async function DELETE(request:any) {
//     const Id = request.nextUrl.searchParams.get("id")
//     await connectMongoDB()
//     await Video.findByIdAndDelete(Id)
//     return NextResponse.json({message:"Video Deleted"})
// }

import connectMongoDB from "@/libs/mongodb";
import Video from "@/models/video.model";
import { NextResponse } from "next/server";

export async function POST(request:any) {
  try {
    const { title, description, img, videoLink } = await request.json();
    await connectMongoDB();
    await Video.create({ title, description, img, videoLink });
    return NextResponse.json({ message: "Video Added to DB" });
  } catch (error) {
    console.error("Error adding video:", error);
    return NextResponse.json({ error: "Error adding video" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const Videos = await Video.find();
    return NextResponse.json({ Videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Error fetching videos" }, { status: 500 });
  }
}

export async function DELETE(request:any) {
  try {
    const Id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Video.findByIdAndDelete(Id);
    return NextResponse.json({ message: "Video Deleted" });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json({ error: "Error deleting video" }, { status: 500 });
  }
}
