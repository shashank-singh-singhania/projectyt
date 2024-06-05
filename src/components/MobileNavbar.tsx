"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded focus:outline-none z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Hamburger icon */}
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        <nav className="flex flex-col p-4 space-y-4 mt-16">
          <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link href="/allplaylist" className="block py-2 px-4 rounded hover:bg-gray-700">
            All Playlists
          </Link>
          <Link href="/about" className="block py-2 px-4 rounded hover:bg-gray-700">
            About
          </Link>
          {/* <Link href="#contact" className="block py-2 px-4 rounded hover:bg-gray-700">
            Contact
          </Link> */}
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
