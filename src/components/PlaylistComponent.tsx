import React from 'react';

const PlaylistComponent = ({ playlist }: any) => {
  return (
    <div className="w-72 bg-neutral-950 rounded-xl shadow-lg pt-4">
      <img className="w-full h-40 object-cover" src={playlist.img} alt={playlist.title} />
      <div className="p-4">
        <h3 className="text-white text-base">{playlist.title}</h3>
        <p className="text-gray-400 text-sm">{playlist.link.length} Videos</p>
      </div>
    </div>
  );
};

export default PlaylistComponent;
