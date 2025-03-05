import React from 'react';

import heroTask from '../../../assets/heroTask.svg'
import timeManagement from '../../../assets/timeManagement.svg'

import { MdAccessTime } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";

const HeroCard = () => {
  return (
    <div>
      <div>

        <div className='flex gap-5'>
          {/* 1st */}
          <div className='flex flex-col w-52'>
            <div className='h-20'></div>
            {/* 2nd card */}
            <div className='bg-white h-64 rounded-lg p-3 space-y-1'>

              <img src={timeManagement} alt="" />

              <div className='flex justify-around items-center'>
                <div>
                <h2 className='text-black font-semibold'>Time Management</h2>
                <p className='text-gray-600'>Efficient Task Control</p>
                </div>
                <div className='text-black text-2xl '>
                <MdAccessTime />
                </div>
              </div>

            </div>
            {/* 3rd card */}
            <div className=''></div>
          </div>
          {/* 2nd */}
          <div className='flex flex-col w-52 gap-2'>
            {/* 1st card */}
            <div className='bg-[#FFAE13] text-black rounded-lg h-64 p-3'>
              <div className='flex flex-col justify-center items-center text-center' >
               <p className='bg-[#FF6B00] px-2  rounded-3xl'>View Task</p>

               <h2 className='font-bold'>Add Your <br />Task/Assignment</h2>

               <img src={heroTask} alt="" />
              </div>
            </div>
            {/* 2nd card */}
            <div className='bg-[#FF6A00] text-black rounded-lg h-36 p-3'>
              <div className='border-[1px] flex flex-col justify-center items-center'>
                <h2 className='text-3xl font-bold'>5 Hours</h2>
                <p className='text-3xl'><BsPersonWorkspace /></p>
                <p className='font-bold text-center'>Extended <br /><span className='text-2xl'>Work <span className='text-gray-100/50'>Duration</span></span></p>
              </div>
            </div>
            {/* 3rd card */}
            <div></div>
            {/* 4th card */}
            <div></div>
            {/* 5th card */}
            <div></div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroCard;