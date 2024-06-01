"use client"

import AddBar from '@/components/AddBar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const [title, setTitle]= useState('')
  const [description, setDescription]= useState('Lorem Ipsum')
  const [img, setImg]= useState('https://img.youtube.com/vi/V2bwqfHSyYM/mqdefault.jpg')
  const [videoLink, setVideoLink]= useState('')

  const router =useRouter()

  const handleSubmit =async(e:any)=>{
    e.preventDefault()

    if (!title || !description || !img || !videoLink) {
      alert("Title, Description, Link & Image are required")
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/videos',{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify({title,description,img,videoLink})
      })

      if (res.ok) {
        router.push('/dashboard')
        router.refresh()
      }else{
        throw new Error("Failed to Add new Video!!")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {/* <AddBar/> */}
    <h1 className=' font-bold text-3xl w-full flex justify-center underline my-4'>Add New Video</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[500px] mx-auto'>
        <input className='border border-slate-500 px-8 py-2' type="text" name="title" placeholder='Add Video Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
        <input className='border border-slate-500 px-8 py-2' type="text" name="image" placeholder='Add Video Thumbnail' value={img} onChange={(e)=>setImg(e.target.value)}/>
        <input className='border border-slate-500 px-8 py-2' type="text" name="description" placeholder='Add Video Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <input className='border border-slate-500 px-8 py-2' type="text" name="link" placeholder='Add Video Link' value={videoLink} onChange={(e)=>setVideoLink(e.target.value)}/>
        <button type='submit' className='p-3 bg-blue-400 w-fit font-bold rounded-lg text-white mx-auto'>Add Video</button>
    </form>
    </>
  )
}

export default page