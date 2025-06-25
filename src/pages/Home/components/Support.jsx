import React from 'react';

import supportImage from '../../../assets/images/support-img.webp';
import arrow from '../../../assets/images/arrow-shape.png';
import spider from '../../../assets/images/spider-net-sm.png';

const Support = () => {
  return (
    <div className='bg-white/5 overflow-hidden py-3 md:py-0'>
      <div className="w-11/12 container mx-auto ">
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-8">

          {/* 1st */}
          <div className='py-5 hidden md:block '>
            <img 
              src={supportImage} 
              alt="Support visual" 
            />
          </div>

          {/* 2nd */}
          <div className='hidden md:block'>
            <img 
              src={arrow} 
              alt="Arrow icon"
              className='filter invert brightness-0' 
            />
          </div>

          {/* 3rd */}
          <div className="relative w-full md:w-[400px] h-[200px] md:h-[250px] ">
            <img 
              src={spider} 
              alt="Spider web background" 
              className="absolute inset-0 w-full h-fit object-contain  filter invert brightness-[80%]"
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white bg-black/0 rounded-xl">
              
              <h1 className="text-2xl md:text-5xl font-bold mb-2">24/7 Assistance</h1>
              <p className="mb-4 text-white/80">Wanna talk? Send us a message</p>
              
              <a href="mailto:rohan26ir@gmail.com" className="text-black bg-white/30 px-8 py-4 rounded-lg font-bold hover:bg-white/40 transition duration-300">
                rohan26ir@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Support;
