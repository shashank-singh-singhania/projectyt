"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SideNav from "@/components/SideNav";

const getYoutubeVideoId = (url: string): string | null => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const Page: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("Lorem Ipsum");
  const [videoLink, setVideoLink] = useState("");
  const [img, setImg] = useState("");

  const router = useRouter();

  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setVideoLink(link);

    const videoId = getYoutubeVideoId(link);
    if (videoId) {
      setImg(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
    } else {
      setImg("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !img || !videoLink) {
      alert("Title, Description, Link & Image are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, img, videoLink }),
      });

      if (res.ok) {
        router.push("/dashboard/allvideo");
        router.refresh();
      } else {
        throw new Error("Failed to Add new Video!!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 bg-gray-100 p-4 md:p-8 ml-64 h-screen"> {/* Adjust the margin-left */}
        <h1 className="text-3xl font-bold mb-8 text-center underline">Add New Video</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-700 text-sm font-bold mb-2">
              Video Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Video Title"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-700 text-sm font-bold mb-2">
              Video Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Video Description"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="link" className="text-gray-700 text-sm font-bold mb-2">
              Video Link
            </label>
            <input
              id="link"
              type="text"
              name="link"
              value={videoLink}
              onChange={handleVideoLinkChange}
              placeholder="Add Video Link"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          {img && (
            <div className="flex flex-col items-center">
              <img src={img} alt="Video Thumbnail" className="h-auto object-cover rounded-lg" />
            </div>
          )}
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white font-bold rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
