import React from 'react';
import Lottie from 'lottie-react';

import ImagReal from "../../../assets/aboutus/imagineReal.svg"
// import devType from '/public/Animation - Developer type.json'
import devType from '../../../assets/Lotttie/Animation - web app build.json'

const ImagineIsReal = () => {
  return (
    <div className='w-11/12 container mx-auto my-5 space-y-10'>

    <div className='hidden md:block lg:hidden space-y-2  -mb-10'>
        <p className="font-bold text-white/40 text-center">Imagine is real!</p>
        <h2 className="md:text-6xl text-white/80 mb-2 font-bold text-center ">
        Everything you can imagine is real
        </h2>
      </div>

<div className='flex flex-col-reverse md:flex-row justify-between items-end gap-5'>

{/* text section */}
<div className="space-y-2 w-full md:w-1/2">
  <p className="hidden lg:block font-bold text-black w-fit bg-amber-500 px-2">Imagine is real!</p>
  <h2 className="hidden lg:block  text-6xl text-white/80 leading-14 font-bold max-w-xl">
  Everything you can imagine is real
  </h2>
  <p className="text-gray-300 max-w-xl -mt-14 sm:mt-0 md:mt-0">
    <span className="text-2xl font-bold ">O</span>ur imagination holds the power to shape reality. Every great invention, artwork, or achievement once lived only in someone’s mind. When we dare to dream boldly and believe in our visions, we begin to breathe life into the unseen. "Everything you can imagine is real" reminds us that creativity is not just fantasy—it’s the first step toward creating something meaningful. Let your ideas run free, because within your imagination lies the blueprint of tomorrow.
  </p>
</div>



<div className='w-full md:w-1/2 flex flex-col items-center'>
<div className='block md:hidden space-y-2  -mb-10'>
<p className="inline font-bold text-black text-center bg-amber-500 px-2">Imagine is real!</p>
<h2 className=" text-4xl md:text-6xl text-white/80 mb-2 font-bold max-w-xl ">
  Everything you can imagine is real
  </h2>
</div>
<div className='w-full flex items-center justify-center h-80  lg:h-96'>
  
{/* <img src={ImagReal} alt="Imagine is real" className="w-auto h-full" /> */}

<Lottie loop={true} autoplay={true} className='w-full h-full ' animationData={devType} />

</div>
</div>
</div>
    </div>
  );
};

export default ImagineIsReal;