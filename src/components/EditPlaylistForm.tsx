"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RemoveFromPlaylistBtn from "./RemovefromplaylistBTN";
import SideNav from "./SideNav";
// import RemoveFromPlaylistBtn from './RemoveFromPlaylistBtn';

interface EditPlaylistFormProps {
  id: string;
  title: string;
  link: any[]; 
  img: string;
}

const EditPlaylistForm: React.FC<EditPlaylistFormProps> = ({
  id,
  title,
  link,
  img,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newImg, setNewImg] = useState(img);
  const [playlist, setPlaylist] = useState<any>(null);
    const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/playlists/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch Playlist");
        }
        const data = await res.json();
        setPlaylist(data.playlist);
      } catch (error) {
        console.log("Error Loading Playlist", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/playlists/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newImg }),
      });

      if (!res.ok) {
        throw new Error("Failed to update playlist");
      }

      // Navigate back to dashboard or update state as needed
        router.push('/dashboard/allplaylist');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveVideo = async (videoId: string) => {
    try {
      const confirmed = confirm("Are you sure?");
      if (confirmed) {
        const res = await fetch(
          `http://localhost:3000/api/playlists/${id}?videoId=${videoId}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          // Refresh the playlist data after deletion
          const updatedPlaylist = { ...playlist };
          updatedPlaylist.link = updatedPlaylist.link.filter(
            (video: any) => video._id !== videoId
          );
          setPlaylist(updatedPlaylist);
        }
      }
    } catch (error) {
      console.error("Failed to remove video from playlist", error);
    }
  };

  if (!playlist) {
    return <div className="flex min-h-screen"> <SideNav />Loading...</div>;
  }

  return (
    // <div>
    //   <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[500px] mx-auto">
    //     <input
    //       onChange={(e) => setNewTitle(e.target.value)}
    //       value={newTitle}
    //       className="border border-slate-500 px-8 py-2"
    //       type="text"
    //       name="title"
    //       placeholder="Edit Playlist Title"
    //     />
    //     <input
    //       onChange={(e) => setNewImg(e.target.value)}
    //       value={newImg}
    //       className="border border-slate-500 px-8 py-2"
    //       type="text"
    //       name="image"
    //       placeholder="Edit Playlist Image"
    //     />
    //     <div>
    //       <h2>Playlist Videos:</h2>
    //       {playlist.link.map((video: any) => (
    //         <div key={video._id} className="p-2 border border-gray-200 rounded-lg my-2">
    //           <h4 className="font-bold">{video.title}</h4>
    //           <p className="text-gray-600">{video.description}</p>
    //           <img src={video.img} alt={video.title} className="w-32 h-auto object-cover" />
    //           <RemoveFromPlaylistBtn videoId={video._id} onRemove={handleRemoveVideo} />
    //         </div>
    //       ))}
    //     </div>
    //     <button type="submit" className="p-3 bg-blue-400 w-fit font-bold rounded-lg text-white mx-auto">
    //       Update Playlist
    //     </button>
    //   </form>
    // </div>

    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 bg-gray-100 p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-center underline">
          Edit Playlist
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-[650px] mx-auto  space-y-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Playlist Title
            </label>

            <input
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              name="title"
              placeholder="Edit Playlist Title"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-gray-700 text-sm font-bold mb-2"
            >
              Video Thumbnail URL
            </label>
            <input
              onChange={(e) => setNewImg(e.target.value)}
              value={newImg}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              name="image"
              placeholder="Edit Playlist Image"
            />
          </div>
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white font-bold rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Playlist
          </button>
          {/* <div>
            <h2>Playlist Videos:</h2>
            {playlist.link.map((video: any) => (
              <div
                key={video._id}
                className="p-2 border border-gray-200 rounded-lg my-2"
              >
                <h4 className="font-bold">{video.title}</h4>
                <p className="text-gray-600">{video.description}</p>
                <img
                  src={video.img}
                  alt={video.title}
                  className="w-32 h-auto object-cover"
                />
                <RemoveFromPlaylistBtn
                  videoId={video._id}
                  onRemove={handleRemoveVideo}
                />
              </div>
            ))}
          </div> */}

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Playlist Videos:</h2>
            <div className="space-y-4">
              {playlist.link.map((video: any) => (
                <div
                  key={video._id}
                  className="p-4 border border-gray-200 rounded-lg flex items-center space-x-4 bg-white shadow-md"
                >
                  <img
                    src={video.img}
                    alt={video.title}
                    className="w-32 h-auto object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{video.title}</h4>
                    <p className="text-gray-600">{video.description}</p>
                  </div>
                  <RemoveFromPlaylistBtn
                    videoId={video._id}
                    onRemove={handleRemoveVideo}
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaylistForm;
