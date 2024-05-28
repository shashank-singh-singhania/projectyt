"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RemoveFromPlaylistBtn from './RemovefromplaylistBTN';
// import RemoveFromPlaylistBtn from './RemoveFromPlaylistBtn';

interface EditPlaylistFormProps {
  id: string;
  title: string;
  link: any[]; // Assuming link is an array of video objects
  img: string;
}

const EditPlaylistForm: React.FC<EditPlaylistFormProps> = ({ id, title, link, img }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newImg, setNewImg] = useState(img);
  const [playlist, setPlaylist] = useState<any>(null);
//   const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/playlists/${id}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch Playlist');
        }
        const data = await res.json();
        setPlaylist(data.playlist);
      } catch (error) {
        console.log('Error Loading Playlist', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/playlists/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newImg }),
      });

      if (!res.ok) {
        throw new Error('Failed to update playlist');
      }

      // Navigate back to dashboard or update state as needed
    //   router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveVideo = async (videoId: string) => {
    try {
      const confirmed = confirm('Are you sure?');
      if (confirmed) {
        const res = await fetch(`http://localhost:3000/api/playlists/${id}?videoId=${videoId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          // Refresh the playlist data after deletion
          const updatedPlaylist = { ...playlist };
          updatedPlaylist.link = updatedPlaylist.link.filter((video: any) => video._id !== videoId);
          setPlaylist(updatedPlaylist);
        }
      }
    } catch (error) {
      console.error('Failed to remove video from playlist', error);
    }
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[500px] mx-auto">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="border border-slate-500 px-8 py-2"
          type="text"
          name="title"
          placeholder="Edit Playlist Title"
        />
        <input
          onChange={(e) => setNewImg(e.target.value)}
          value={newImg}
          className="border border-slate-500 px-8 py-2"
          type="text"
          name="image"
          placeholder="Edit Playlist Image"
        />
        <div>
          <h2>Playlist Videos:</h2>
          {playlist.link.map((video: any) => (
            <div key={video._id} className="p-2 border border-gray-200 rounded-lg my-2">
              <h4 className="font-bold">{video.title}</h4>
              <p className="text-gray-600">{video.description}</p>
              <img src={video.img} alt={video.title} className="w-32 h-auto object-cover" />
              <RemoveFromPlaylistBtn videoId={video._id} onRemove={handleRemoveVideo} />
            </div>
          ))}
        </div>
        <button type="submit" className="p-3 bg-blue-400 w-fit font-bold rounded-lg text-white mx-auto">
          Update Playlist
        </button>
      </form>
    </div>
  );
};

export default EditPlaylistForm;