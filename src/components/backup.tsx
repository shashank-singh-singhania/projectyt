"use client";
import PlaylistComponent from "@/components/PlaylistComponent";
import React, { useEffect, useState, useRef } from "react";

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



const Page = () => {
  const [playlists, setPlaylists] = useState([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getPlaylists();
      setPlaylists(playlistData.Playlists);
    };

    fetchData();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount =
        direction === "left" ? -current.clientWidth : current.clientWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1>Playlists</h1>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
        <div className="flex gap-8 flex-col p-4 px-24">
          <ul
            className="flex flex-row gap-12 overflow-y-auto  whitespace-nowrap  "
            ref={scrollRef}
          >
            {playlists.map((playlist: any) => (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full z-10"
                  onClick={() => scroll("left")}
                >
                  &lt;
                </button>
                <li className="">
                  <PlaylistComponent key={playlist._id} playlist={playlist} />
                </li>
                <li>
                  <PlaylistComponent key={playlist._id} playlist={playlist} />
                </li>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full z-10"
                  onClick={() => scroll("right")}
                >
                  &gt;
                </button>
              </>
            ))}
          </ul>
          <ul className="flex flex-row gap-12 overflow-y-auto whitespace-nowrap ">
            {playlists.map((playlist: any) => (
              <>
                <li>
                  <PlaylistComponent key={playlist._id} playlist={playlist} />
                </li>
                <li>
                  <PlaylistComponent key={playlist._id} playlist={playlist} />
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Page;
