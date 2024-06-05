"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SideNav from './SideNav'

const EditvideoForm = ({id,title,description,img}:any) => {

    const [newTitle,setNewTitle] = useState(title)
    const [newDescription,setNewDescription] = useState(description)
    const [newImg,setNewImg] = useState(img)

    const router = useRouter()

    const handleSubmit= async(e:any)=>{
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/api/videos/${id}`,{
                method:"PUT",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({newTitle,newDescription,newImg})
            })

            if (!res.ok) {
                throw new Error("Failed to update video")
            }

            router.push("/dashboard/allvideo")
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    // <div>
    //     <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[500px] mx-auto'>
    //     <input onChange={e=>setNewTitle(e.target.value)} value={newTitle} className='border border-slate-500 px-8 py-2' type="text" name="title" placeholder='Edit Video Title' />
    //     <input onChange={e=>setNewImg(e.target.value)} value={newImg} className='border border-slate-500 px-8 py-2' type="text" name="image" placeholder='Edit Video Image' />
    //     <input onChange={e=>setNewDescription(e.target.value)} value={newDescription} className='border border-slate-500 px-8 py-2' type="text" name="description" placeholder='Edit Video Description' />
    //     <button type='submit' className='p-3 bg-blue-400 w-fit font-bold rounded-lg text-white mx-auto'>Update Video</button>
    // </form>
    // </div>
    <div className="flex min-h-screen">
        <SideNav/>
        <div className="flex-1 bg-gray-100 p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-center underline">Edit Video</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-700 text-sm font-bold mb-2">
              Video Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={newTitle}
              onChange={e=>setNewTitle(e.target.value)}
              placeholder="Edit Video Title"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-gray-700 text-sm font-bold mb-2">
              Video Thumbnail URL
            </label>
            <input
              id="image"
              type="text"
              name="image"
              value={newImg}
              onChange={e=>setNewImg(e.target.value)}
              placeholder="Edit Video Thumbnail"
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
              value={newDescription}
              onChange={e=>setNewDescription(e.target.value)}
              placeholder="Add Video Description"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="link" className="text-gray-700 text-sm font-bold mb-2">
              Video Link
            </label>
            <input
              id="link"
              type="text"
              name="link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Add Video Link"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div> */}
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white font-bold rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Video
          </button>
        </form>
        </div>
    </div>
  )
}

export default EditvideoForm