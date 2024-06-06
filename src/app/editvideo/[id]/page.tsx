import EditvideoForm from '@/components/EditvideoForm'
import React from 'react'

const getVideoById =async(id:any)=>{
  try {
    const res = await fetch(`/api/videos/${id}`,{cache:"no-store"})
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
  const {video}:any = await getVideoById(id)
  // console.log(video)
  const {title, description,img} = video

  return <EditvideoForm id={id} title={title} description={description} img={img} />
}

export default page