"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import RemovePlaylistBTN from "./RemovePlaylistBTN";

interface Playlist {
  _id: string;
  title: string;
  link: string[];
  img: string;
}

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

const PlaylistList: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getPlaylists();
      const sortedPlaylists = playlistData.Playlists.sort((a, b) => (a._id > b._id ? -1 : 1));
      setPlaylists(sortedPlaylists);
      setFilteredPlaylists(sortedPlaylists);
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredPlaylists(
      playlists.filter(
        (playlist) =>
          playlist.title.toLowerCase().includes(value) ||
          playlist.link.length.toString().includes(value)
      )
    );
  };

  return (
    <div className="p-8">
      <div className="w-full flex">

      <input
        type="text"
        placeholder="Search playlists..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-6 p-2 border border-gray-300 rounded w-[900px] mx-auto"
      />
      </div>
      {filteredPlaylists.map((p) => (
        <div
          key={p._id}
          className="p-4 border border-slate-200 my-3 flex justify-between gap-5 w-[900px] mx-auto items-start rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="font-bold text-2xl">{p.title}</h2>
              <p className="text-gray-600">Number of Videos: {p.link.length}</p>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-gray-500 mr-2">Playlist ID:</span>
              <span>{p._id}</span>
            </div>
          </div>
          <img src={p.img} alt={p.title} className="w-32 h-auto object-cover rounded" />
          <Link href={`/editplaylist/${p._id}`}>
            <HiPencilAlt size={24} />
          </Link>
          <RemovePlaylistBTN id={p._id} />
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
