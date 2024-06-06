"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiSolidVideos } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";


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
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("sessionStatus");
    router.push("/");
  };

  return (
    <div className="fixed w-64 bg-gray-900 text-white flex flex-col h-full p-4">
      <Link
        href={"/dashboard"}
        className="text-2xl font-bold mb-4 mx-auto underline"
      >
        GTC
      </Link>
      <nav className="flex-1 flex flex-col space-y-2 mt-5">
        {NavLink.map(({ link, name, icon }) => {
          const isActive = pathname.startsWith(link);

          return (
            <Link key={name} href={link}>
              <h1
                className={`px-4 py-2 hover:bg-gray-700 rounded text-center ${
                  isActive ? "bg-slate-700 text-white" : ""
                }`}
              >
                <div className="flex items-center justify-around px-5">
                  {icon}
                  {name}
                </div>
              </h1>
            </Link>
          );
        })}
        <Link href="/">
          <h1 className="px-4 py-2 hover:bg-gray-700 rounded text-center ">
            <div className="flex items-center justify-around px-5">
              <IoHome size={20} />
              Home Page
            </div>
          </h1>
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto px-4 py-2 hover:bg-red-700 rounded text-center text-white bg-red-600"
      >
        <div className="flex items-center justify-around px-5">
          <TbLogout2  size={20} />
          Logout
        </div>
      </button>
    </div>
  );
};

export default SideNav;
