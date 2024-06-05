"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiSolidVideos } from "react-icons/bi";
import { IoHome } from "react-icons/io5";

const NavLink = [
  {
    name: "Add Video",
    link: "/dashboard/addvideo",
    icon: <IoIosAddCircle size={27} />,
  },
  {
    name: "Add Playlist",
    link: "/dashboard/addplaylist",
    icon: <MdPlaylistAdd size={27} />,
  },
  {
    name: "All Videos",
    link: "/dashboard/allvideo",
    icon: <BiSolidVideos size={25} />,
  },
  {
    name: "All Playlists",
    link: "/dashboard/allplaylist",
    icon: <RiPlayList2Fill size={20} />,
  },
];

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-4 h-full ">
        <Link
          href={"/dashboard"}
          className="text-2xl font-bold mb-4 mx-auto underline"
        >
          GTC
        </Link>
        <nav className="flex flex-col space-y-2 mt-5">
          {/* <Link href="/addtopic">
            <h1 className="px-4 py-2 hover:bg-gray-700 rounded text-center selection:bg-gray-700">Add Video</h1>
          </Link>
          <Link href="/addplaylist">
            <h1 className="px-4 py-2 hover:bg-gray-700 rounded text-center selection:bg-gray-700">Add Playlist</h1>
          </Link>
          <Link href="/dashboard/allvideo">
            <h1 className="px-4 py-2 hover:bg-gray-700 rounded text-center selection:bg-gray-700">All Videos</h1>
          </Link>
          <Link href="/dashboard/allplaylist">
            <h1 className="px-4 py-2 hover:bg-gray-700 rounded text-center selection:bg-gray-700">All Playlists</h1>
          </Link> */}

          {NavLink.map(({ link, name, icon }) => {
            const isActive = pathname.startsWith(link);

            return (
              <Link key={name} href={link}>
                <h1
                  className={`px-4 py-2 hover:bg-gray-700 rounded text-center ${
                    isActive ? "bg-slate-700 text-white" : ""
                  }`}
                >
                  <div className="flex  items-center  justify-around px-5">
                    {icon}
                    {name}
                  </div>
                </h1>
              </Link>
            );
          })}
          <Link href="/">
            <h1 className="px-4 py-2 hover:bg-gray-700 rounded text-center ">
              <div className="flex  items-center  justify-around px-5">
                <IoHome size={20} />
                Home Page
              </div>
            </h1>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;
