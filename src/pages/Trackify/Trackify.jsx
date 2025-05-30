import React from 'react';
import TrackifyHero from './TrackifyHero';
import StepTrack from './StepTrack/StepTrack';
import { Link } from 'react-router-dom';

const Trackify = () => {
  return (
    <div className='w-full mx-auto my-10'>
      <TrackifyHero></TrackifyHero>


      {/* Trackify */}
      <div>


        <div>
          <div className='py-5 flex justify-center'>
        <Link to={'/Trackify/Addtask'}><button className='btn'>Add Task</button></Link>
      </div>
        </div>


        <StepTrack></StepTrack>
      </div>


    </div>
  );
};

export default Trackify;