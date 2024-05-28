"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

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

            router.push("/dashboard")
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[500px] mx-auto'>
        <input onChange={e=>setNewTitle(e.target.value)} value={newTitle} className='border border-slate-500 px-8 py-2' type="text" name="title" placeholder='Edit Video Title' />
        <input onChange={e=>setNewImg(e.target.value)} value={newImg} className='border border-slate-500 px-8 py-2' type="text" name="image" placeholder='Edit Video Image' />
        <input onChange={e=>setNewDescription(e.target.value)} value={newDescription} className='border border-slate-500 px-8 py-2' type="text" name="description" placeholder='Edit Video Description' />
        <button type='submit' className='p-3 bg-blue-400 w-fit font-bold rounded-lg text-white mx-auto'>Update Video</button>
    </form>
    </div>
  )
}

export default EditvideoForm