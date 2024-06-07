import EditPlaylistForm from '@/components/EditPlaylistForm'
import EditvideoForm from '@/components/EditvideoForm'
import React from 'react'

const getVideoById =async(id:any)=>{
  try {
    const res = await fetch(`https://projectyt-five.vercel.app/api/playlists/${id}`,{cache:"no-store"})
    if (!res.ok) {
      throw new Error("Failed to fetch videos")
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}


const page = async({params}:any) => {

  const {id} = params
  const {playlist}:any = await getVideoById(id)
  // console.log("my playlist",playlist)
  const {title, link,img} = playlist

  // return <EditvideoForm id={id} title={title} description={description} img={img} />
  return <EditPlaylistForm id={id} title={title} link={link} img={img} />
}

export default page