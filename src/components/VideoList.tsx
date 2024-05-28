import React from "react";
import RemoveBTN from "./RemoveBTN";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

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

const VideoList = async () => {
  const { Videos } = await getVideos();
  return (
    <>
      {Videos.map((v: any) => (
  <div className="p-4 border border-slate-200 my-3 flex justify-between gap-5 w-[700px] mx-auto items-start rounded-lg shadow-lg overflow-hidden">
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
    <img src={v.img} alt="video thumbnail" className="w-32 h-auto object-cover" />
    <div className="flex gap-2 items-center">
      <RemoveBTN id={v._id} />
      <Link href={`/editvideo/${v._id}`}>
        <HiPencilAlt size={24} />
      </Link>
    </div>
  </div>
))}

    </>
  );
};

export default VideoList;
