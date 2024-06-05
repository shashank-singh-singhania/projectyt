import connectMongoDB from "@/libs/mongodb"
// import Video from "@/models/video.model"
import Playlist from "@/models/playlist.model"
import { NextResponse } from "next/server"

export async function POST(request:any) {
    const {title, link,img,subject} = await request.json()
    console.log(title,link,img,subject)
    await connectMongoDB()
    await Playlist.create({title,link,img,subject})
    return NextResponse.json({message:"Playlist Added to DB"})
}


export async function GET() {
    await connectMongoDB()
    const Playlists = await Playlist.find().populate('link')
    return NextResponse.json({Playlists})
}


export async function DELETE(request:any) {
    // const Id = request.nextUrl.searchParams.get("id")
    // await connectMongoDB()
    // await Playlist.findByIdAndDelete(Id)
    // return NextResponse.json({message:"Playlist Deleted"})


    // try {
    //     const { id, videoId } = request.query;
    
    //     if (!id || !videoId) {
    //       return NextResponse.json({ error: "Playlist ID and Video ID are required" }, { status: 400 });
    //     }
    
    //     await connectMongoDB();
    //     const playlist = await Playlist.findById(id);
    
    //     if (!playlist) {
    //       return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    //     }
    
    //     playlist.link.pull(videoId); // Remove videoId from link array
    
    //     await playlist.save();
    
    //     return NextResponse.json({ message: "Video removed from playlist successfully" });
    //   } catch (error) {
    //     console.error("Error removing video from playlist:", error);
    //     return NextResponse.json({ error: "Failed to remove video from playlist" }, { status: 500 });
    //   }

    try {
        const { id, videoId } = request.query;
    
        if (!id || !videoId) {
          return NextResponse.json({ error: "Playlist ID and Video ID are required" }, { status: 400 });
        }
    
        await connectMongoDB();
        const playlist = await Playlist.findById(id);
        // await Playlist.findByIdAndDelete(id)
    
        if (!playlist) {
          return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
        }
    
        // Remove videoId from link array
        playlist.link = playlist.link.filter((v:any) => v.toString() !== videoId);
    
        await playlist.save();
    
        return NextResponse.json({ message: "Video removed from playlist successfully" });
      } catch (error) {
        console.error("Error removing video from playlist:", error);
        return NextResponse.json({ error: "Failed to remove video from playlist" }, { status: 500 });
      }
}