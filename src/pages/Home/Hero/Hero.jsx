import React, { useContext } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import { AuthContext } from '../../../Provider/Provider';
import { Link } from 'react-router-dom';
import HeroCard from './HeroCard';

const Hero = () => {
  const {user} = useContext(AuthContext);


  return (
    <div className='py-5 bg-black/95  '>
      <div className='w-11/12 mx-auto '>

        <div className='flex flex-col-reverse md:flex-row'>
          <div className='flex-auto space-y-2'>
            <h3 className='text-3xl font-bold text-white/40'>Productivity</h3>
            <h2 className='text-4xl font-bold text-white'>Your Personal and  <br />Work Life, All in <br />One Place</h2>

            <p className='text-lg'>Dev Diary24 is your all-in-one digital workspace. <br />Take daily notes, manage personal and work-related <br />tasks, track deadlines, and store essential FAQs <br /> effortlessly. Stay organized and boost your productivity <br />like never before.</p>

            {user 
             ? <Link to={'/dashboard'}><button className='bg-[#FB2C36] px-3 py-2 rounded-lg cursor-pointer font-bold'>Deshboard</button></Link>  
             : <Link to={'/Account/SignIn'}><button className='bg-[#FB2C36] px-3 py-2 rounded-lg cursor-pointer font-bold'>Sign Up</button></Link>
          }


            <p className='text-gray-500 flex items-center gap-1 cursor-pointer mt-10'><FaArrowDownLong />Learn more about Dev-diary24</p>

          </div>
          <div>
            <HeroCard></HeroCard>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;