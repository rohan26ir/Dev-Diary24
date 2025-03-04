import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='bg-black/45 min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-3xl mx-auto flex flex-col gap-6 items-center text-center'>

        {/* Error Number */}
        <div className='relative inline-block'>
          <h2 className='text-[120px] sm:text-[150px] md:text-[180px] lg:text-[200px] font-bold leading-none'>
            40<span className='inline-block -rotate-[30deg] -ml-4 sm:-ml-6 md:-ml-8 animate-pulse'>4</span>
          </h2>
          <div className='border-b-4 border-gray-600 w-full flex justify-center'></div>
        </div>

        {/* Error Message */}
        <p className='uppercase font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-4'>
          The Page You're Looking <br className="hidden sm:block" /> for Doesn't Exist.
        </p>

        {/* Back to Home Button */}
        <Link to={'/'}>
          <button className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300'>
            Go Back To Home
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Error;
