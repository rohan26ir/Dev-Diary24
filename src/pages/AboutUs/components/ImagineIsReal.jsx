import React from 'react';

import ImagReal from "../../../assets/aboutus/imagineReal.svg"

const ImagineIsReal = () => {
  return (
    <div className='w-11/12 container mx-auto my-5 space-y-10'>

    <div className='hidden md:block lg:hidden space-y-2'>
        <p className="font-bold text-white/40 text-center">Imagine is real!</p>
        <h2 className="md:text-6xl text-white/80 mb-2 font-bold text-center">
        Everything you can imagine is real
        </h2>
      </div>

<div className='flex flex-col-reverse md:flex-row justify-between items-end gap-5'>

{/* text section */}
<div className="space-y-2 w-full md:w-1/2">
  <p className="hidden lg:block font-bold text-white/40 w-fit">Imagine is real!</p>
  <h2 className="hidden lg:block  text-6xl text-white/80 leading-14 font-bold max-w-xl ">
  Everything you can imagine is real
  </h2>
  <p className="text-gray-300 max-w-xl">
    <span className="text-2xl font-bold">O</span>ur imagination holds the power to shape reality. Every great invention, artwork, or achievement once lived only in someone’s mind. When we dare to dream boldly and believe in our visions, we begin to breathe life into the unseen. "Everything you can imagine is real" reminds us that creativity is not just fantasy—it’s the first step toward creating something meaningful. Let your ideas run free, because within your imagination lies the blueprint of tomorrow.
  </p>
</div>



<div className='w-full md:w-1/2 flex flex-col '>
<div className='block md:hidden space-y-2'>
<p className="font-bold text-white/40 text-center">Imagine is real!</p>
<h2 className=" text-4xl md:text-6xl text-white/80 mb-2 font-bold max-w-xl ">
  Everything you can imagine is real
  </h2>
</div>
<img src={ImagReal} alt="Imagine is real" className="w-auto h-full" />

</div>
</div>
    </div>
  );
};

export default ImagineIsReal;