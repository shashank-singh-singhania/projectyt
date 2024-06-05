import React, { useState } from 'react';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 h-full bg-gray-800 text-white z-50 md:hidden">
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Hamburger icon */}
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>
      <div
        className={`flex flex-col items-start p-4 space-y-4 transition-transform duration-300 transform ${isOpen ? 'translate-x-0 ' : '-translate-x-full w-0'}`}
      >
        {/* Nav items */}
        <a href="#home" className="block py-2 px-4 rounded hover:bg-gray-700">
          Home
        </a>
        <a href="#about" className="block py-2 px-4 rounded hover:bg-gray-700">
          About
        </a>
        <a href="#services" className="block py-2 px-4 rounded hover:bg-gray-700">
          Services
        </a>
        <a href="#contact" className="block py-2 px-4 rounded hover:bg-gray-700">
          Contact
        </a>
      </div>
    </div>
  );
};

export default Navbar2;
