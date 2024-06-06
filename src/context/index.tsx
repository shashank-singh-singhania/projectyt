import { createContext, useContext, useEffect, useState } from "react";

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

// Fetch Videos
const getVideos = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/videos", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Videos");
    }
    const data = await res.json();
    return data.Videos; // Extracting only the Videos array from the response
  } catch (error) {
    console.error("Error Loading Videos", error);
    return []; // Return an empty array if there's an error
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
    const data = await res.json();
    return data.Playlists; // Extracting only the Playlists array from the response
  } catch (error) {
    console.error("Error Loading Playlists", error);
    return []; // Return an empty array if there's an error
  }
};

const AppContext = createContext<{
  videos: Video[];
  playlists: Playlist[];
}>({
  videos: [],
  playlists: [],
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedVideos = await getVideos();
      const fetchedPlaylists = await getPlaylists();
      setVideos(fetchedVideos);
      setPlaylists(fetchedPlaylists);
    };

    fetchData();
  }, []);

  // Ensure the context provider provides both videos and playlists
  return (
    <AppContext.Provider value={{ videos, playlists }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}