import React from 'react';
import HomeTask from './Task/HomeTask';
import ShowTasks from '../../Dashboard/ShowTasks/ShowTasks';
import Hero from './Hero/Hero';

const HomePage = () => {
  return (
    <div>
      <div>

        <div className='bg-white'><Hero></Hero></div>
        <div><ShowTasks></ShowTasks></div>

      </div>
    </div>
  );
};

export default HomePage;