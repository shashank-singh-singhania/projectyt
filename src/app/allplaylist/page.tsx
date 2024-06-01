"use client";
import Navbar from "@/components/Navbar2";
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
  const mathsRef = useRef<HTMLDivElement>(null);
  const chemistryRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getPlaylists();
      setPlaylists(playlistData.Playlists);
    };

    fetchData();
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const { current } = ref;
      const scrollAmount =
        direction === "left" ? -current.clientWidth : current.clientWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filterPlaylistsBySubject = (subject: string) =>
    playlists.filter((playlist:any) => playlist.subject === subject);

  const subjects = ["Maths", "Chemistry", "Physics"];
  const refs:any = { Maths: mathsRef, Chemistry: chemistryRef, Physics: physicsRef };

  return (
    <div className="w-full  bg-fixed bg-left-top  bg-no-repeat bg-black"
    style={{ backgroundImage: "url('http://localhost:3000/bg.jpg')" }}>
    {/* <Navbar /> */}
    <div className="min-h-screen  p-4">
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold mb-6 text-white underline">All Playlists</h1>
        {subjects.map((subject) => (
          <div key={subject} className="relative mt-4">
            <h2 className="text-2xl font-bold  text-white">{subject}</h2>
            <div className="relative flex items-center">
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 z-10"
                onClick={() => scroll(refs[subject], "left")}
              >
                &lt;
              </button>
              <div
                className="flex overflow-x-auto whitespace-nowrap gap-16 scrollbar-hide px-1"
                ref={refs[subject]}
              >
                {filterPlaylistsBySubject(subject).map((playlist:any) => (
                  <div key={playlist._id} className="flex-shrink-0 w-64 p-2">
                    <PlaylistComponent playlist={playlist} />
                  </div>
                ))}
              </div>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-md z-10"
                onClick={() => scroll(refs[subject], "right")}
              >
                &gt;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Page;
