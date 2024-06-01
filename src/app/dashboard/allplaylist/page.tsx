import PlaylistList from '@/components/PlaylistList'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1 className=' font-bold text-3xl w-full flex justify-center underline my-4'>All Playlist</h1>
        <PlaylistList/>
    </div>
  )
}

export default page