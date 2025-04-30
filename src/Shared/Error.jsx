import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../assets/error.webp'

const Error = () => {
  return (
    <div className='bg-black/45 min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-3xl mx-auto flex flex-col gap-6 items-center text-center'>

        {/* Error Number */}
        <div className=''>
          <img 
          src={errorImg} 
          className='w-auto h-40 md:w-auto md:h-80'
          alt="" />
        </div>

        {/* Error Message */}
        <p className='uppercase font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-4'>
          The Page You're Looking <br className="hidden sm:block" /> for Doesn't Exist.
        </p>

        {/* Back to Home Button */}
        <Link to={'/'}>
          <button className='px-6 py-3 bg-[#FB2C36] hover:bg-[#FB2C36]/90 text-white font-semibold rounded-lg shadow-md transition-all duration-30 cursor-pointer'>
            Go Back To Home
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Error;
