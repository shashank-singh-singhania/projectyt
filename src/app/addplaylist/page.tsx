"use client";

import AddBar from "@/components/AddBar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [img, setImg] = useState(
    "https://img.youtube.com/vi/V2bwqfHSyYM/mqdefault.jpg"
  );
  const [subject, setSubject] = useState("");

  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!title || !videos || !img || !subject) {
      alert("Title, videos, Image, and Subject are required")
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/playlists', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ title, videos, img, subject })
      })

      if (res.ok) {
        router.push('/dashboard/allplaylist')
        router.refresh()
      } else {
        throw new Error("Failed to Add new Video!!")
      }
    } catch (error) {
      console.log(error)
    }

    console.log(videos)
  }
  return (
    <>
      {/* <AddBar/> */}
      <h1 className=" font-bold text-3xl w-full flex justify-center underline my-4">
        Create New Playlist
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-[500px] mx-auto"
      >
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          name="title"
          placeholder="Add Playlist Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          name="image"
          placeholder="Add Playlist Thumbnail"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        {/* <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          name="videos"
          placeholder="Add Video videos"
          value={videos}
          onChange={(e:any) => setVideos(e.target.value)}  

        /> */}

        {/* Radio button input to select the subject */}
        <div className="flex flex-col gap-3">
          <label>
            <input
              type="radio"
              name="subject"
              value="Physics"
              checked={subject === "Physics"}
              onChange={(e) => setSubject(e.target.value)}
            />
            Physics
          </label>
          <label>
            <input
              type="radio"
              name="subject"
              value="Chemistry"
              checked={subject === "Chemistry"}
              onChange={(e) => setSubject(e.target.value)}
            />
            Chemistry
          </label>
          <label>
            <input
              type="radio"
              name="subject"
              value="Maths"
              checked={subject === "Maths"}
              onChange={(e) => setSubject(e.target.value)}
            />
            Maths
          </label>
        </div>

        <button
          type="submit"
          className="p-3 bg-blue-600 w-fit font-bold rounded-lg text-white mx-auto focus:bg-slate-800"
        >
          Add Video
        </button>
      </form>
    </>
  );
};

export default page;
