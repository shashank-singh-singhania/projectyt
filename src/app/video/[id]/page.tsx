
import Embeddedvideo from '@/components/Embeddedvideo';
import MobileNavbar from '@/components/MobileNavbar';
import Navbar from '@/components/Navbar';

const Page = ({params}:any) => {


  return (
   <div className='bg-black'>
    <MobileNavbar />
    <div className=" hidden md:block">
    <Navbar/>
    </div>
   {/* <h1>this is {params.id}</h1> */}
   <Embeddedvideo id={params.id}/>
   </div>
  );
};

export default Page;
