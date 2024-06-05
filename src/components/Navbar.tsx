"use client";

import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { FaArrowLeftLong } from "react-icons/fa6";

import { RiPlayList2Fill } from "react-icons/ri";
import { FaCircleQuestion } from "react-icons/fa6";

import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`bg-gray-800 h-screen fixed left-0 top-0 transition-all duration-300 ${
        isOpen ? "w-44" : "w-16"
      }`}
    >
      <div className="p-4">
        {isOpen ? (
          <div className="flex justify-center items-center text-white mb-10">
            <h1 className=" text-2xl font-semibold">GTC</h1>
          </div>
        ) : (
          <div className="flex justify-center items-center text-white mb-10">
            <IoIosArrowDown size={50} />
          </div>
        )}

        <Link
          href="/"
          className="text-white text-xl font-semibold flex justify-center items-center"
        >
          <IoMdHome size={25} />
        </Link>

        <Link href="/allplaylist" className="flex justify-center items-center text-white  mt-7">
          <RiPlayList2Fill size={20} />
        </Link>

        <Link href="/about" className="flex justify-center items-center text-white  mt-7">
          <FaCircleQuestion  size={20} />
        </Link>

      </div>
      <div className="p-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white mt-3">
            {/* <svg
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
            </svg> */}

            {isOpen ? (
              <h1></h1>
            ) : (
              <FaSearch className="cursor-pointer" onClick={toggleNavbar} />
            )}
            
          </span>
          <input
            type="text"
            className={`block w-full bg-gray-900 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
              isOpen ? "block" : "hidden"
            }`}
            placeholder="Search"
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />
          {isOpen ? (
            <div className="flex justify-center items-center mt-8 text-white cursor-pointer">
              <FaArrowLeftLong onClick={() => setIsOpen(false)} />
            </div>
          ) : (
            <h1></h1>
          )}
        </div>
      </div>
    </nav>
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
