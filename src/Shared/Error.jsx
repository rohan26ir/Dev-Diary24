import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='bg-black/45'>
      <div className='w-11/12 mx-auto min-h-screen flex flex-col gap-8 items-center justify-center'>

        <div className='text-center'>
          <div className=' inline-block'>
            <h2 className='text-[200px] font-bold'>
              40<span className='inline-block -rotate-[30deg] -ml-8 animate-pulse'>4</span>
            </h2>
            <div className='border-b-4 border-gray-600 -mt-16 w-[110%] flex justify-center  '></div>
          </div>
          <div>
            <p className='uppercase font-semibold text-4xl mt-4'>
              The Page You're Looking <br /> for doesn't Exist.
            </p>
          </div>
        </div>


        <div>

          <div>
            <Link to={'/'}><button className='btn'>Go Back To Home</button></Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Error;
