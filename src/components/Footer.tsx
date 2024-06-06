"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { CiWarning } from "react-icons/ci";


const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <button
          className="text-sm sm:text-base underline hover:text-gray-400 transition-colors flex justify-center items-center gap-2"
          onClick={handleOpenModal}
        >
          <CiWarning />
          Disclaimer
        </button>
        <Link
          href="/about"
          rel="noopener noreferrer"
          className="mt-2 sm:mt-0 text-sm sm:text-base underline hover:text-gray-400 transition-colors"
        >
          Created by TEAM GTC
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
              <p className="mb-4 text-gray-200">
                This is the disclaimer text. It can include any relevant information or warnings you want to provide to your users.
              </p>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
