import About from '@/components/About'
import MobileNavbar from '@/components/MobileNavbar'
import Navbar from "@/components/Navbar";
import React from 'react'

const page = () => {
  return (
    <div>
      <MobileNavbar />
      <div className="hidden md:block">
        <Navbar />
      </div>
        <About/>
    </div>
  )
}

export default page