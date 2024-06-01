import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-800 text-white ${isOpen ? 'w-16' : 'w-64'} transition-width duration-300`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {/* Hamburger icon here */}
        <span className="block">☰</span>
      </button>
      {/* Add nav items here */}
    </div>
  );
};

export default Navbar;
