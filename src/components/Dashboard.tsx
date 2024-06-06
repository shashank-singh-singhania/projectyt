"use client";

import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import { AppWrapper } from '@/context';
import { useAppContext } from '@/context';

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

// Type definitions for dashboard data
interface DashboardData {
  totalVideos: number;
  totalPlaylists: number;
  totalVisits: number;
}

const sampled = {
  totalVideos: 1234,
  totalPlaylists: 56,
  totalVisits: 7890,
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  // const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {videos} = useAppContext()
  console.log(videos)

  useEffect(() => {
    const fetchData = async () => {
      const videoData = await getVideos();
      const playlistData = await getPlaylists();
      // setVideos(videoData.Videos);
      setPlaylists(playlistData.Playlists);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AppWrapper>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold">Total Videos</h2>
              <p className="text-3xl mt-4">{videos.length}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold">Total Playlists</h2>
              <p className="text-3xl mt-4">{playlists.length}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold">Total Visits </h2>
              <p className="text-3xl mt-4">{sampled.totalVisits}</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </AppWrapper>
  );
};

export default Dashboard;
