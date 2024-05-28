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
    const playlist = await Playlist.findOne({_id:id}).populate('link')
    return NextResponse.json({playlist})
}

export async function DELETE(request:any,{params}:any) {
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
    
    //     // Remove videoId from link array
    //     playlist.link = playlist.link.filter((v:any) => v.toString() !== videoId);
    
    //     await playlist.save();
    
    //     return NextResponse.json({ message: "Video removed from playlist successfully" });
    //   } catch (error) {
    //     console.error("Error removing video from playlist:", error);
    //     return NextResponse.json({ error: "Failed to remove video from playlist" }, { status: 500 });
    //   }



    // const {
    //     query: { id, videoId },
    //     method,
    //   } = request;
    
    //   switch (method) {
    //     case "GET":
    //       try {
    //         await connectMongoDB();
    //         const playlist = await Playlist.findById(id);
    
    //         if (!playlist) {
    //           return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    //         }
    
    //         return NextResponse.json({ playlist });
    //       } catch (error) {
    //         console.error("Error loading playlist:", error);
    //         return NextResponse.json({ error: "Failed to fetch playlist" }, { status: 500 });
    //       }
    
    //     case "DELETE":
    //       try {
    //         if (!id || !videoId) {
    //           return NextResponse.json({ error: "Playlist ID and Video ID are required" }, { status: 400 });
    //         }
    
    //         await connectMongoDB();
    //         const playlist = await Playlist.findById(id);
    
    //         if (!playlist) {
    //           return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    //         }
    
    //         playlist.link.pull(videoId); // Remove videoId from link array
    //         await playlist.save();
    
    //         return NextResponse.json({ message: "Video removed from playlist successfully" });
    //       } catch (error) {
    //         console.error("Error removing video from playlist:", error);
    //         return NextResponse.json({ error: "Failed to remove video from playlist" }, { status: 500 });
    //       }
    
    //     default:
    //       return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    //   }

    const { id } = params;
  const videoId = request.nextUrl.searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    playlist.link.pull(videoId);
    await playlist.save();

    return NextResponse.json({ message: "Video removed from playlist successfully" });
  } catch (error) {
    console.error("Error removing video from playlist:", error);
    return NextResponse.json({ error: "Failed to remove video from playlist" }, { status: 500 });
  }
}

