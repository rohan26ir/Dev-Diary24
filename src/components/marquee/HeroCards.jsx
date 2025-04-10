import React from 'react';

const HeroCards = () => {
  return (
    <div className='h-40 flex flex-col justify-center items-center bg-[#FF6A00] rounded-lg p-3'>
      <div className='flex justify-center'>
        <marquee behavior="" direction="right" className='text-3xl font-bold text-white flex flex-row w-[100%]'>
          <div>
            <h2>Hello</h2>
          </div>
        </marquee>
      </div>
    </div>
  );
};

export default HeroCards;