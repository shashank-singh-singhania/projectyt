import React from 'react';


const VideoComponent = ({ video }:any) => {
  return (
    <div className="w-72  bg-neutral-950 rounded-lg overflow-hidden shadow-lg">
      <img className="w-full h-40 object-cover" src={video.img} alt={video.title} />
      <div className="p-4">
        <h3 className="text-white text-base ">{video.title}</h3>
      </div>
    </div>
  );
};


export default VideoComponent;
