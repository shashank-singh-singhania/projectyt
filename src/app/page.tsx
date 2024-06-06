import MainLayout from "@/components/MainLayout";

export default function Home() {
  return (
    <div className="bg-black h-full">

      {/* <h1>Hello</h1>
      <div className="ml-16 flex gap-4">

      <Link href={'/dashboard'} className="bg-blue-300 p-2 rounded-lg">All Videos</Link>
      <Link href={'/addtopic'} className="bg-blue-300 p-2 rounded-lg">Add Video</Link>
      <Link href={'/addplaylist'} className="bg-blue-300 p-2 rounded-lg">Add Playlist</Link>
      <Link href={'/dashboard/allplaylist'} className="bg-blue-300 p-2 rounded-lg">All Playlists</Link>
      </div> */}

      <div className="">
        <MainLayout />
      </div>
    </div>
  );
}
