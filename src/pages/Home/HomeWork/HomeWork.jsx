import React from 'react';

import assignment from "../../../assets/Home/assignment.svg"
import animationAssignment from '/public/Animation - assignment.json';
import Lottie from 'lottie-react';

const HomeWork = () => {
  return (
    <div className='pb-10'>
      <div className='w-11/12 container mx-auto'> 


        <div className='flex flex-col md:flex-row-reverse justify-between items-center py-0'>
          <div className='w-[100%] pb-10 md:pb-0'>
            {/* <img 
            src={assignment} 
            className='h-80'
            alt="Assignment" /> */}

            <Lottie 
            animationData={animationAssignment} 
            loop={true}
            className='h-80'
            />

          </div>


          <div className="w-[100%] space-y-5 bg-black z-30">
              <div>
                <p className="inline-block font-bold bg-amber-500 text-black px-2">Assignments</p>
              <h2 className="text-xl md:text-2xl text-white font-bold">Mastering Homework: Tips & Tricks for Success</h2>
              </div>
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