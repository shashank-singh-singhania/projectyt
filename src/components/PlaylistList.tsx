"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getPlaylists();
      setPlaylists(playlistData?.Playlists || []);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <h1>Playlists</h1> */}
      {playlists.map((p: any) => (
        <div key={p._id} className="p-4 border border-slate-200 my-3 flex justify-between gap-5 w-[900px] mx-auto items-start rounded-lg shadow-lg overflow-hidden">
          <div>
            <h2 className="font-bold text-xl">{p.title}</h2>
            <p className="text-gray-600">Number of Videos: {p.link.length}</p>
          </div>
          <img
            src={p.img}
            alt={p.title}
            className="w-32 h-auto object-cover"
          />
          <Link href={`/editplaylist/${p._id}`}>
              <HiPencilAlt size={24} />
            </Link>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
