"use client"

import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

const RemovePlaylistBTN = ({id}:any) => {

  const router = useRouter()
  const removeVideo = async()=>{
    const confirmed = confirm("Are you sure?")

    if (confirmed) {
      const res = await fetch(`/api/playlists?id=${id}`,{
        method:"DELETE"
      })

      if (res.ok) {
        router.refresh()
      }
    }
  }
  return <button onClick={removeVideo} className='text-red-400'>
    <HiOutlineTrash size={24}/>
  </button>
}

export default RemovePlaylistBTN