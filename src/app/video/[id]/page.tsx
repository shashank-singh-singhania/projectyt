
import Embeddedvideo from '@/components/Embeddedvideo';

const Page = ({params}:any) => {


  return (
   <div className='bg-black'>
   {/* <h1>this is {params.id}</h1> */}
   <Embeddedvideo id={params.id}/>
   </div>
  );
};

export default Page;
