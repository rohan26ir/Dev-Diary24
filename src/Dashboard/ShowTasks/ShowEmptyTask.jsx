import React from 'react';

const ShowEmptyTask = () => {
  return (
    <div>
      <div className='w-11/12 mx-auto py-2 text-white'>

        <div className='flex flex-col-reverse md:flex-row gap-2 w-[100%]'>
          {/* 1st */}
          <div className='w-[30%]'>
            <div>
              <p className='font-bold text-white/30'>Task</p>
              <h2 className='text-2xl font-bold'>See Task Time and Date</h2>
              <p>Easily track tasks with start times, deadlines, and real-time updates to stay organized and productive!</p>
            </div>
          </div>
          {/* 2nd */}
          <div className='flex flex-col gap-2 w-[70%]'>
            {/* 1st card */}
          <div className=''>
            <div className='flex md:flex-row w-[100%] gap-2'>
            <div className='w-[70%] rounded-sm bg-white text-orange-500 h-24'>
dsf
          </div>
          <div className='w-[30%] rounded-sm bg-white text-orange-500 h-24'>
sdfds
          </div>
            </div>
            </div>
            {/* 2nd card */}
          <div className=''>
            <div className='flex md:flex-row w-[100%] gap-2'>
            <div className='w-[30%] rounded-sm bg-white text-orange-500 h-24'>
dsf
          </div>
          <div className='w-[70%] rounded-sm bg-white text-orange-500 h-24'>
sdfds
          </div>
            </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ShowEmptyTask;