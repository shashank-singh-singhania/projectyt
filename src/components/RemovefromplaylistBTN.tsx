"use client"

import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface RemoveFromPlaylistBtnProps {
  videoId: string;
  onRemove: (videoId: string) => void;
}

const RemoveFromPlaylistBtn: React.FC<RemoveFromPlaylistBtnProps> = ({ videoId, onRemove }) => {
  const removeVideo = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      onRemove(videoId);
    }
  };

  return (
    <button onClick={removeVideo} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveFromPlaylistBtn;