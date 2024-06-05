"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBTN from "./RemoveBTN";

interface Video {
  _id: string;
  title: string;
  description: string;
  img: string;
}

interface Playlist {
  _id: string;
  title: string;
  link: string[];
}

const getVideos = async (): Promise<{ Videos: Video[] }> => {
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

const getPlaylists = async (): Promise<{ Playlists: Playlist[] }> => {
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

const PlaylistDropdown: React.FC<{
  videoId: string;
  playlists: Playlist[];
  onSave: (videoId: string, playlistId: string) => void;
}> = ({ videoId, playlists, onSave }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlaylist(event.target.value);
  };

  const handleSave = () => {
    onSave(videoId, selectedPlaylist);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedPlaylist}
        onChange={handleSelect}
        className="border border-gray-300 rounded p-2"
      >
        <option value="" disabled>
          Select Playlist
        </option>
        {playlists.map((playlist) => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.title}
          </option>
        ))}
      </select>
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
};

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const videoData = await getVideos();
      const playlistData = await getPlaylists();
      setVideos(videoData.Videos.sort((a, b) => (a._id > b._id ? -1 : 1)));
      setFilteredVideos(videoData.Videos.sort((a, b) => (a._id > b._id ? -1 : 1)));
      setPlaylists(playlistData.Playlists);
    };

    fetchData();
  }, []);

  const handleSave = async (videoId: string, playlistId: string) => {
    if (!playlistId) return;

    try {
      const selectedPlaylist = playlists.find((playlist) => playlist._id === playlistId);
      if (!selectedPlaylist) return;

      const updatedLinks = [...selectedPlaylist.link, videoId];

      const res = await fetch(`http://localhost:3000/api/playlists/${playlistId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newLink: updatedLinks }),
      });

      if (!res.ok) {
        throw new Error("Failed to save video to playlist");
      }

      setPlaylists(
        playlists.map((playlist) =>
          playlist._id === playlistId ? { ...playlist, link: updatedLinks } : playlist
        )
      );
    } catch (error) {
      console.error("Error saving video to playlist", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredVideos(
      videos.filter(
        (video) =>
          video.title.toLowerCase().includes(value) ||
          video.description.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="p-8">
      <div className="w-full flex">

      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-6 p-2 border border-gray-300 rounded w-[900px] mx-auto"
      />
      </div>
      {filteredVideos.map((v) => (
        <div
          key={v._id}
          className="p-4 border border-slate-200 my-3 flex justify-between gap-5 w-[900px] mx-auto items-start rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="font-bold text-2xl">{v.title}</h2>
              <p className="text-gray-600">{v.description}</p>
              <div className="flex gap-2 items-center mt-5">
                <RemoveBTN id={v._id} />
                <Link href={`/editvideo/${v._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
                <PlaylistDropdown videoId={v._id} playlists={playlists} onSave={handleSave} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-gray-500 mr-2">Video ID:</span>
              <span>{v._id}</span>
            </div>
          </div>
          <img src={v.img} alt="video thumbnail" className="w-32 h-auto object-cover rounded" />
        </div>
      ))}
    </div>
  );
};

export default VideoList;
