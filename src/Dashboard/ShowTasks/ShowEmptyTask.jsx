import React, { useContext } from 'react';
import RealTimeClock from '../../components/RealTimeClock';

import { GoGoal } from "react-icons/go";
import { BsFileEarmarkBreakFill } from 'react-icons/bs';
import {  GiStarFormation, GiTimeBomb } from "react-icons/gi";  
import { AuthContext } from '../../Provider/Provider';

const ShowEmptyTask = () => {
  const {user} =useContext(AuthContext)
  
  return (
    <div>
      <div className='w-11/12 container mx-auto py-2 text-white'>

        <div className='flex flex-col-reverse md:flex-row gap-2 w-[100%]'>
          {/* 1st */}
          <div className='w-[100%] md:w-[30%]'>
            <div>
              <p className='font-bold text-white/30'>Task</p>
              <h2 className='text-2xl font-bold'>See Task Time and Date</h2>
              <p>Easily track tasks with start times, deadlines, and real-time updates to stay organized and productive!</p>
            </div>
          </div>
          {/* 2nd */}
          <div className='flex flex-col gap-2 w-[100%] md:w-[70%]'>
            {/* 1st card */}
          <div className=''>
            <div className='flex flex-col md:flex-row w-[100%] gap-2'>
            <div className='w-[100%]  md:w-[70%] rounded-sm bg-white/15 px-2 overflow-hidden text-text h-24'>
            <div className='flex flex-wrap justify-between gap-2'>
              <div className='flex flex-col justify-center items-center'>
                
                <div className='flex flex-col h-24 w-24 justify-center items-center bg-black/20 rounded-full gap-1'>
                <div>
                <GiStarFormation />
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <h2>Prioritize</h2>
                  {/* <p className='text-xs'>Focus on high-impact tasks first.</p> */}
                </div>
                </div>

              </div>
              <div className='flex flex-col justify-center items-center'>

              <div className='flex flex-col h-24 w-24 justify-center items-center bg-black/20 rounded-full gap-1'>
                <div>
                <BsFileEarmarkBreakFill />
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <h2>Breakdown</h2>
                  {/* <p className='text-xs'>Focus on high-impact tasks first.</p> */}
                </div>
                </div>

              </div>
              <div className='flex flex-col justify-center items-center'>
                
              <div className='flex flex-col h-24 w-24 justify-center items-center bg-black/20 rounded-full gap-1'>
                <div>
                <GiTimeBomb />
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <h2>Deadline</h2>
                  {/* <p className='text-xs'>Focus on high-impact tasks first.</p> */}
                </div>
                </div>
                
              </div>
              <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col h-24 w-24 justify-center items-center bg-black/20 rounded-full gap-1'>
                <div>
                <GoGoal />
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <h2>Focus</h2>
                  {/* <p className='text-xs'>Focus on high-impact tasks first.</p> */}
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[100%]  md:w-[30%] rounded-sm bg-white/15 p-2 text-black h-24'>
            <div className='p-2 flex justify-center items-center h-20 text-4xl font-bold text-white/90'>
              {/* show Clock */}
              <RealTimeClock></RealTimeClock>
            </div>
          </div>
            </div>



            </div>
            {/* 2nd card */}
          <div className=''>
            <div className='flex md:flex-row w-[100%] gap-2'>
            {/* <div className='w-[30%] rounded-sm bg-white/50 p-2 text-black h-24'>
            <h2>Lorem, ipsum dolor.</h2>
          </div> */}

          <div className='w-[27%]  hidden md:block'>

          </div>

          {
            !user 
            &&
            <div className='w-[100%]  md:w-[73%]  rounded-sm bg-white/15 p-2 text-black h-20'>
            <div className='flex justify-between gap-1 px-3 '>
              <div className='flex flex-col justify-center items-center '>
                <div className='text-xl text-white/95'>Sat</div>
                <div className='text-2xl font-bold text-white'>1</div>
              </div>
              <div className='flex flex-col justify-center items-center '>
                <div className='text-xl text-white/95'>Sun</div>
                <div className='text-2xl font-bold text-white'>2</div>
              </div>
              <div className='flex flex-col justify-center items-center '>
                <div className='text-xl text-white/95'>Mon</div>
                <div className='text-2xl font-bold text-white'>3</div>
              </div>
              <div className='flex flex-col justify-center items-center bg-[#FB2C36]/40 px-4 py-1 rounded-lg '>
                <div className='text-xl text-white/95'>Tue</div>
                <div className='text-2xl font-bold text-white'>4</div>
              </div>
              <div className='flex flex-col justify-center items-center '>
                <div className='text-xl text-white/95'>Wed</div>
                <div className='text-2xl font-bold text-white'>5</div>
              </div>
              <div className='flex flex-col justify-center items-center '>
                <div className='text-xl text-white/95'>Thu</div>
                <div className='text-2xl font-bold text-white'>6</div>
              </div>
              <div className='flex flex-col justify-center items-center '>
                <div className='text-xl text-white/95'>Fri</div>
                <div className='text-2xl font-bold text-white'>7</div>
              </div>
            </div>
          </div>
          }

          
            </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ShowEmptyTask;