"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import VideoComponent from "@/components/VideoComponent";
import PlaylistComponent from "@/components/PlaylistComponent";
import Link from "next/link";
import MobileNavbar from "@/components/MobileNavbar";
// import Loader from "@/components/Loader"; // Assume you have a Loader component

// Type definitions
interface Video {
  _id: string;
  title: string;
  description: string;
  img: string;
  videoLink: string;
}

interface Playlist {
  _id: string;
  title: string;
  link: Video[];
  img: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch Videos
const getVideos = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/videos", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Videos");
    }
    return res.json();
  } catch (error) {
    console.error("Error Loading Videos", error);
    return { Videos: [] };
  }
};

// Fetch Playlists
const getPlaylists = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/playlists", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Playlists");
    }
    return res.json();
  } catch (error) {
    console.error("Error Loading Playlists", error);
    return { Playlists: [] };
  }
};

const MainLayout: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const videoData = await getVideos();
      const playlistData = await getPlaylists();
      setVideos(videoData.Videos);
      setPlaylists(playlistData.Playlists);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div
      className="w-full bg-fixed bg-left-top bg-no-repeat bg-black"
      style={{ backgroundImage: "url('http://localhost:3000/bg1.png')" }}
    >
      <MobileNavbar />
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="p-4 md:p-8 md:px-40">
        {loading ? (
         <div className=" h-screen text-white flex justify-center items-center">
         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white"></div>
       </div> // Display loader while fetching data
        ) : (
          <>
            <div className="text-white mt-16 md:mt-48">
              <h1 className="text-3xl md:text-6xl font-bold text-center md:text-left">
                Indefinite Integration
              </h1>
              <p className="mt-4 max-w-md text-center md:text-left text-1xl p-3 md:p-0">
                Indefinite integration is the process of finding the antiderivative of a function, essentially reversing differentiation. It results in an indefinite integral representing all possible antiderivatives of the function.
              </p>
              <div className="mt-8 text-center md:text-left">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
                  Play
                </button>
                <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                  <Link href="/allplaylist">All Playlists</Link>
                </button>
              </div>
            </div>

            <div className="mt-12 mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">Videos</h2>
              <div className="flex flex-wrap gap-4 md:gap-8 px-6 md:px-0">
                {videos.map((video) => (
                  <Link key={video._id} href={`/video/${video._id}`}>
                    <VideoComponent video={video} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">Playlists</h2>
              <div className="flex flex-wrap gap-4 md:gap-8 px-6 md:px-0">
                {playlists.map((playlist) => (
                  <Link key={playlist._id} href={`/playlist/${playlist._id}`}>
                    <PlaylistComponent playlist={playlist} />
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
