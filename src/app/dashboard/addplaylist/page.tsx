"use client";

// pages/page.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SideNav from '@/components/SideNav';
import ProtectedRoute from "@/components/ProtectedRoute";

const Page: React.FC = () => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(
    'https://img.youtube.com/vi/V2bwqfHSyYM/mqdefault.jpg'
  );
  const [subject, setSubject] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !img || !subject) {
      alert('Title, Image, and Subject are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, img, subject }),
      });

      if (res.ok) {
        router.push('/dashboard/allplaylist');
        // router.reload();
      } else {
        throw new Error('Failed to Add new Playlist!!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav/>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8 text-center underline">Create New Playlist</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Playlist Title
            </label>
            <input
              id="title"
              className="border border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              name="title"
              placeholder="Add Playlist Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Playlist Thumbnail URL
            </label>
            <input
              id="image"
              className="border border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              name="image"
              placeholder="Add Playlist Thumbnail"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Subject</p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="subject"
                  value="Physics"
                  checked={subject === 'Physics'}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mr-2"
                />
                <span>Physics</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="subject"
                  value="Chemistry"
                  checked={subject === 'Chemistry'}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mr-2"
                />
                <span>Chemistry</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="subject"
                  value="Maths"
                  checked={subject === 'Maths'}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mr-2"
                />
                <span>Maths</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white font-bold rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Playlist
          </button>
        </form>
      </div>

    </div>
    </ProtectedRoute>
  );
};

export default Page;
