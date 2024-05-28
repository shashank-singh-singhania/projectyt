"use client"

import React, { useState, useEffect } from "react";
import RemoveBTN from "./RemoveBTN";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

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

const PlaylistDropdown = ({ videoId, playlists, onSave }:any) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handleSelect = (event:any) => {
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
        <option value="" disabled>Select Playlist</option>
        {playlists.map((playlist:any) => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.title}
          </option>
        ))}
      </select>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

const VideoList = () => {
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

  const handleSave = async (videoId:any, playlistId:any) => {
    if (!playlistId) return;

    try {
      // Find the selected playlist
      const selectedPlaylist = playlists.find(playlist => playlist._id === playlistId);
      // Add the video ID to the link array
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

      console.log(`Video ${videoId} added to playlist ${playlistId}`);
      // Optionally, update local state to reflect changes
      setPlaylists(playlists.map(playlist => playlist._id === playlistId ? { ...playlist, link: updatedLinks } : playlist));
    } catch (error) {
      console.log("Error saving video to playlist", error);
    }
  };

  return (
    <>
      {videos.map((v:any) => (
        <div
          key={v._id}
          className="p-4 border border-slate-200 my-3 flex justify-between gap-5 w-[900px] mx-auto items-start rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-2xl">{v.title}</h2>
              <p className="text-gray-600">{v.description}</p>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-gray-500 mr-2">Video ID:</span>
              <span>{v._id}</span>
            </div>
          </div>
          <img
            src={v.img}
            alt="video thumbnail"
            className="w-32 h-auto object-cover"
          />
          <div className="flex gap-2 items-center">
            <RemoveBTN id={v._id} />
            <Link href={`/editvideo/${v._id}`}>
              <HiPencilAlt size={24} />
            </Link>
            <PlaylistDropdown
              videoId={v._id}
              playlists={playlists}
              onSave={handleSave}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default VideoList;
