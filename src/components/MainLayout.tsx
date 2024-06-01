"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import VideoComponent from "./VideoComponent";
import PlaylistComponent from "./PlaylistComponent";
import Link from "next/link";


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
    console.log("Error Loading Videos", error);
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
    console.log("Error Loading Playlists", error);
  }
};

const MainLayout = () => {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const videoData = await getVideos();
      const playlistData = await getPlaylists();
      setVideos(videoData.Videos);
      setPlaylists(playlistData.Playlists);
    };

    fetchData();
  }, []);

  return (
    <div
      className="w-full  bg-fixed bg-left-top  bg-no-repeat bg-black"
      style={{ backgroundImage: "url('http://localhost:3000/bg1.png')" }}
    >
      <Navbar />
      <div className=" p-8 px-40 ">

        <div className="text-white mt-48">
          <h1 className="text-6xl font-bold">Indefinite Integration</h1>
          <p className="mt-4 max-w-md">
            Indefinite integration is the process of finding the antiderivative
            of a function, essentially reversing differentiation. It results in
            an indefinite integral representing all possible antiderivatives of
            the function.
          </p>
          <div className="mt-8">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
              Play
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
              <Link href={"/allplaylist"}>

              All Playlists
              </Link>
            </button>
          </div>
        </div>

        <div className="mt-12 ">
          <h2 className="text-2xl font-bold text-white mb-4">Videos</h2>
          <div className="flex gap-8 flex-wrap">
          {videos.map((video:any) => (
            <>
            <Link href={`/video/${video._id}`}>
              <VideoComponent key={video._id} video={video} />
            </Link>
            </>
            ))}
          </div>

        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
          <div className="flex gap-8 flex-wrap">

          {playlists.map((playlists:any) => (
            <>
              <PlaylistComponent key={playlists._id} playlist={playlists}/>
            </>
            ))}

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;



const video = [
  {
    id: 1,
    title: "Indefinite Integration With Timestamps",
    thumbnail: "https://via.placeholder.com/300x200",
    url: "https://www.example.com/video1",
  },
  {
    id: 2,
    title: "Indefinite Integral One Shot",
    thumbnail: "https://via.placeholder.com/300x200",
    url: "https://www.example.com/video2",
  },
  {
    id: 3,
    title: "Integration for JEE 2024",
    thumbnail: "https://via.placeholder.com/300x200",
    url: "https://www.example.com/video3",
  },
  {
    id: 4,
    title: "Indefinite Integral for JEE Adv.",
    thumbnail: "https://via.placeholder.com/300x200",
    url: "https://www.example.com/video4",
  },
  {
    id: 5,
    title: "Indefinite Integration Practice Sheet",
    thumbnail: "https://via.placeholder.com/300x200",
    url: "https://www.example.com/video5",
  },
  {
    id: 6,
    title: "JEE Mains & Advanced Maths",
    thumbnail: "https://via.placeholder.com/300x200",
    url: "https://www.example.com/video6",
  },
];

const playlist = [
  {
    id: 1,
    title: "Integration One Shot",
    thumbnail: "https://via.placeholder.com/300x200",
    videos: 8,
  },
  {
    id: 2,
    title: "Indefinite Integration Concepts",
    thumbnail: "https://via.placeholder.com/300x200",
    videos: 7,
  },
  {
    id: 3,
    title: "Antiderivatives and Integrals",
    thumbnail: "https://via.placeholder.com/300x200",
    videos: 10,
  },
  {
    id: 4,
    title: "Indefinite Integration for Problem Solving",
    thumbnail: "https://via.placeholder.com/300x200",
    videos: 12,
  },
  {
    id: 5,
    title: "Indefinite Integral Lecture Series",
    thumbnail: "https://via.placeholder.com/300x200",
    videos: 5,
  },
  {
    id: 6,
    title: "Basic Integration Techniques",
    thumbnail: "https://via.placeholder.com/300x200",
    videos: 3,
  },
];
