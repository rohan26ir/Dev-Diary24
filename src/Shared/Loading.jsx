import React from 'react';
import { FaRocket } from 'react-icons/fa'; // Using a rocket icon for flair

const Loading = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative flex flex-col items-center">
        {/* Outer Ring Spinner */}
        <div className="w-20 h-20 border-4 border-[#FB2C36] border-dashed rounded-full animate-spin"></div>
        {/* Inner Pulsing Circle */}
        <div className="absolute w-12 h-12 bg-[#FB2C36] rounded-full animate-ping opacity-20 top-5"></div>
        {/* Rocket Icon */}
        {/* <div className="absolute animate-bounce">
          <FaRocket className="text-[#FB2C36] text-3xl" />
        </div> */}
        {/* Loading Text with Gradient */}
        <p className="mt-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB2C36] to-white animate-pulse">
          Loading...
        </p>
        {/* Subtle Dots Animation */}
        <div className="flex mt-2 space-x-2">
          <span className="w-2 h-2 bg-[#FB2C36] rounded-full animate-bounce delay-100"></span>
          <span className="w-2 h-2 bg-[#FB2C36] rounded-full animate-bounce delay-200"></span>
          <span className="w-2 h-2 bg-[#FB2C36] rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;