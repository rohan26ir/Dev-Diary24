import React, { useContext } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import { AuthContext } from '../../../Provider/Provider';
import { Link, useNavigate } from 'react-router-dom';
import HeroCard from './HeroCard';

import robot from '../../../assets/Home/robot.gif'

const Hero = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLearn = (e) => {
    e.preventDefault();
     window.scrollTo({
      top: 1800,
      behavior: 'smooth'
    });

    setTimeout(() => {
      navigate('/about');

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 1600);

  }


  return (
    <div className='py-5 bg-black/95  '>
      <div className='w-11/12 mx-auto container'>

        <div className='flex flex-col-reverse lg:flex-row'>
          <div className='flex-auto space-y-5 max-w-[100%] '>
            <h3 className='text-2xl -mb-2 inline-block font-bold bg-amber-500 text-black px-2'>Productivity</h3>
            <h2 className='text-4xl font-bold text-white md:max-w-xl lg:max-w-md'>Your Personal and Work Life, All in One Place</h2>
            <p className='text-lg max-w-lg'>Dev Diary24 is your all-in-one digital workspace. Take daily notes, manage personal and work-related tasks, track deadlines, and store essential FAQs effortlessly. Stay organized and boost your productivity like never before.</p>

            <div className='inline-block rounded-lg'>
              <Link to={'/ai-Interview'}>
              <button className='bg-[#FB2C36] pr-3 py-0.5 cursor-pointer font-bold flex items-center justify-center ring-2 ring-white/40'><img src={robot} className='h-10 w-fit' alt="" />Ai Mock Interview</button>
             </Link>
            </div>


            <p onClick={handleLearn} className=' text-gray-400 w-fit rounded-3xl flex items-center gap-1 cursor-pointer'><span className='animate-bounce'><FaArrowDownLong /></span> Learn more DevDiary24</p>

          </div>
          {/* img */}
          <div className='py-5 pb-10 md:py-10 lg:block'>
            <HeroCard></HeroCard>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;