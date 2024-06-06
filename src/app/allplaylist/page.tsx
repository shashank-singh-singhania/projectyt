"use client";
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import PlaylistComponent from "@/components/PlaylistComponent";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

// Define the Playlist type
interface Playlist {
  _id: string;
  title: string;
  subject: string;
}

// Fetch Playlists
const getPlaylists = async (): Promise<{ Playlists: Playlist[] }> => {
  try {
    const res = await fetch("/api/playlists", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Playlists");
    }
    return res.json();
  } catch (error) {
    console.log("Error Loading Playlists", error);
    return { Playlists: [] }; // Return an empty array in case of error
  }
};

const Page: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const mathsRef = useRef<HTMLDivElement>(null);
  const chemistryRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const playlistData = await getPlaylists();
      setPlaylists(playlistData.Playlists);
      setLoading(false);
    };

    fetchData();
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const { current } = ref;
      const scrollAmount = direction === "left" ? -current.clientWidth : current.clientWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filterPlaylistsBySubject = (subject: string) =>
    playlists.filter((playlist) => playlist.subject === subject);

  const filterPlaylistsBySearch = (query: string) =>
    playlists.filter((playlist) =>
      playlist.title.toLowerCase().includes(query.toLowerCase())
    );

  const subjects = ["Maths", "Chemistry", "Physics"];
  const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
    Maths: mathsRef,
    Chemistry: chemistryRef,
    Physics: physicsRef,
  };

  return (
    <>
      <div className="">
        <div
          className="w-full bg-fixed bg-left-top bg-no-repeat bg-gray-950"
          // style={{ backgroundImage: "url('http://localhost:3000/bg.jp')" }}
        >
          <div className="min-h-screen p-4">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-white underline text-center">
                All Playlists
              </h1>

              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search playlists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 border border-gray-800 rounded-lg w-full bg-slate-900 text-white"
                />
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white"></div>
                </div>
              ) : (
                subjects.map((subject) => (
                  <div key={subject} className="relative mt-4">
                    <h2 className="text-2xl font-bold text-white">{subject}</h2>
                    <div className="relative flex items-center border-2 border-gray-800 rounded-lg">
                      <button
                        className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 px-2 py-1 md:px-4 md:py-2 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 z-10"
                        onClick={() => scroll(refs[subject], "left")}
                      >
                        &lt;
                      </button>
                      <div
                        className="flex overflow-x-auto whitespace-nowrap gap-16 scrollbar-hide px-1"
                        ref={refs[subject]}
                      >
                        {filterPlaylistsBySearch(searchQuery)
                          .filter((playlist) => playlist.subject === subject)
                          .map((playlist) => (
                            <div key={playlist._id} className="flex-shrink-0 w-64 p-2">
                              <Link href={`/playlist/${playlist._id}`}>
                                <PlaylistComponent playlist={playlist} />
                              </Link>
                            </div>
                          ))}
                      </div>
                      <button
                        className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-md z-10"
                        onClick={() => scroll(refs[subject], "right")}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                ))
              )}
              {/* Add the MobileNavbar component */}
              <MobileNavbar />
            </div>
            <div className="hidden md:block">
              <Navbar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
