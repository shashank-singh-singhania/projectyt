import React from 'react'
import VideoList from '@/components/VideoList'
import SideNav from '@/components/SideNav'

const page = () => {
  return (
    <div className="flex min-h-screen">
      <SideNav/>
      <div className="flex-1 bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-black underline text-center">
                All Videos
              </h1>
         <VideoList/>
      </div>
    </div>
  )
}

export default page