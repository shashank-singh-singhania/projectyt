"use client";

import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`bg-gray-800 h-screen fixed left-0 top-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        <a href="/" className="text-white text-xl font-semibold">
          🏠
        </a>
      </div>
      <div className="p-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-500 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              onClick={toggleNavbar}
            >
              <path
                fillRule="evenodd"
                d="M9 1a8 8 0 0 1 5.54 13.54l5.16 5.16a1 1 0 0 1-1.42 1.42l-5.16-5.16A8 8 0 1 1 9 1zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 9 3z"
              />
            </svg>
          </span>
          <input
            type="text"
            className={`block w-full bg-gray-900 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isOpen ? 'block' : 'hidden'}`}
            placeholder="Search"
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};

const MainContent = () => {
  return (
    <div className="ml-16 lg:ml-64 p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">
        Welcome to the dashboard! Here you can find a variety of features and information.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Card 1</h2>
          <p>Some content for the first card.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Card 2</h2>
          <p>Some content for the second card.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Card 3</h2>
          <p>Some content for the third card.</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <MainContent /> */}
    </div>
  );
};

export default App;