import AddBar from '@/components/AddBar'
import Dashboard from '@/components/Dashboard'
import VideoList from '@/components/VideoList'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        {/* <AddBar/>
        <h1 className=' font-bold text-3xl w-full flex justify-center underline my-4'>All Videos</h1>
        <VideoList/> */}
        {/* Page */}

        {/* <div className=' '>
          <h1 className='font-bold text-2xl flex justify-center'>Other Pages Link</h1>

          <div className='flex gap-4 mx-auto w-full justify-center mt-4'>

          <Link href={'http://localhost:3000/dashboard/allplaylist'} className=' p-2 bg-slate-500 rounded-lg text-white font-bold'>All Playlists</Link>
          <Link href={'http://localhost:3000/addtopic'}className=' p-2 bg-slate-500 rounded-lg text-white font-bold'>Add Video</Link>
          <Link href={'http://localhost:3000/addplaylist'}className=' p-2 bg-slate-500 rounded-lg text-white font-bold'>Add Playlist</Link>
          </div>

        </div> */}

        <Dashboard/>
    </div>
  )
}

export default page