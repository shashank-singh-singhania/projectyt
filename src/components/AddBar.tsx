import Link from "next/link";
import React from "react";

const AddBar = () => {
  return (
    <div className="bg-gray-200 m-4 flex justify-between w-96 mx-auto rounded-lg">
      <h1 className="p-2 text-lg">Add Videos</h1>
      <Link href={'/addtopic'} className="bg-blue-300 p-2 rounded-lg">add</Link>
    </div>
  );
};

export default AddBar;
