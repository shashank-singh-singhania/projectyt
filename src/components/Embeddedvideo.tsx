"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Video {
  _id: string;
  title: string;
  description: string;
  img: string;
  videoLink: string;
}

interface EmbeddedVideoProps {
  id: string;
}

const Embeddedvideo: React.FC<EmbeddedVideoProps> = ({ id }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch video data from API
    fetch('/api/videos') // Replace with your API URL
      .then(response => response.json())
      .then(data => {
        setVideos(data.Videos);
        // Find and set the selected video based on the ID from the URL
        const video = data.Videos.find((v: Video) => v._id === id);
        setSelectedVideo(video || data.Videos[0]); // Fallback to first video if ID not found
      })
      .catch(error => console.error('Error fetching video data:', error));
  }, [id]);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const getEmbedUrl = (url: string): string | null => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="container mx-auto mt-7">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            {selectedVideo && (
              <div className="mb-4">
                {getEmbedUrl(selectedVideo.videoLink) ? (
                  <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={getEmbedUrl(selectedVideo.videoLink) || ''}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <p>Video cannot be embedded.</p>
                )}
                <h2 className="text-xl font-semibold mt-4 text-gray-200">{selectedVideo.title}</h2>
                <p className="mt-2 text-gray-200">{selectedVideo.description}</p>
              </div>
            )}
          </div>
          <div className="md:w-1/4 md:ml-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">Other Videos</h2>
            <ul>
              {videos.map((video) => (
                <li
                  key={video._id}
                  onClick={() => handleVideoSelect(video)}
                  className="mb-2 cursor-pointer hover:bg-gray-900 p-2 rounded-md"
                >
                  <div className="flex items-center">
                    <img
                      src={video.img}
                      alt={video.title}
                      className="w-28 h-16 mr-4 rounded-md"
                    />
                    <div>
                      <h3 className="font-medium text-gray-200">{video.title}</h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Embeddedvideo;
