"use client";

import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import VideoComponent from "@/components/VideoComponent";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

interface PageProps {
  params: {
    id: string;
  };
}

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
    console.log("Error Loading Playlists", error);
  }
};

const Page = ({ params }: PageProps) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const playlistData = await getPlaylists();
      setPlaylists(playlistData.Playlists);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (playlists.length > 0) {
      const playlist = playlists.find((p) => p._id === params.id);
      setSelectedPlaylist(playlist || null);
    }
  }, [playlists, params.id]);

  if (loading) {
    return (
      <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="bg-black h-screen text-white flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white"></div>
      </div>
      </>
    );
  }

  if (!selectedPlaylist) {
    return (
      <div className="bg-black h-screen text-white">
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <p>Playlist not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MobileNavbar />
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      <div className="bg-black h-screen md:px-28 md:pt-5">
        <h1 className="text-2xl font-bold mb-6 text-white underline text-center pt-4 md:text-3xl">
          {selectedPlaylist.title}
        </h1>
        <div className="w-full flex flex-wrap gap-11 bg-black ">
          {selectedPlaylist.link.map((video) => (
            <div key={video._id} className="border-2 border-gray-800 rounded-lg mx-auto">
              <Link href={`/video/${video._id}`}>
                <div>
                  <VideoComponent video={video} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
