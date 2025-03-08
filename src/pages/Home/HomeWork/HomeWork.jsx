import React from 'react';

import assignment from "../../../assets/Home/assignment.svg"

const HomeWork = () => {
  return (
    <div>
      <div>


        <div className='flex flex-col md:flex-row'>
          <div className='w-[100%] flex justify-center items-center'>
            <img 
            src={assignment} 
            className='h-80'
            alt="Assignment" />
          </div>


          <div className="w-[100%] space-y-1 bg-black z-30">
              <p className="text-white/35 font-bold">Assignments</p>
              <h2 className="text-xl md:text-2xl text-white font-bold">Mastering Homework: Tips & Tricks for Success</h2>
              <p className="text-sm md:text-base text-white/80">
              Homework is an essential part of learning, helping students reinforce concepts and develop critical thinking skills. Stay organized, manage your time effectively, and tackle assignments with confidence!
              </p>

              <div className="flex gap-2 py-2">
                <div className="bg-white/20 text-white/85 hover:bg-white/15 px-4 py-1 rounded-3xl"> Strategies </div>
                <div className="bg-white/20 text-white/85 hover:bg-white/15 px-4 py-1 rounded-3xl"> Subjects </div>
                <div className="bg-white/20 text-white/85 hover:bg-white/15 px-4 py-1 rounded-3xl"> Tools </div>
              </div>
            </div>
        </div>


      </div>
    </div>
  );
};

export default HomeWork;