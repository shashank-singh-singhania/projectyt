import PlaylistList from "@/components/PlaylistList";
import SideNav from "@/components/SideNav";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
    <div className="flex min-h-screen">
      <SideNav />

      <div className="flex-1 bg-gray-100 p-4 md:p-8 ml-64">
        <h1 className=" font-bold text-3xl w-full flex justify-center underline my-4">
          All Playlist
        </h1>
        <PlaylistList />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default page;
