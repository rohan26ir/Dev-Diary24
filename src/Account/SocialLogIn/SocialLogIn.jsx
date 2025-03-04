import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogIn = () => {
  return (
    <div>
      <div className='flex justify-center'>

        <div className='border-2 border-gray-300 w-full text-center py-1 font-bold rounded-lg cursor-pointer  flex justify-center items-center gap-1  overflow-hidden'>
        <FcGoogle /> Sign In With Google
        
        </div>

      </div>
    </div>
  );
};

export default SocialLogIn;