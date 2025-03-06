import React, { useContext } from 'react';
import HomeTask from './Task/HomeTask';
import ShowTasks from '../../Dashboard/ShowTasks/ShowTasks';
import Hero from './Hero/Hero';
import { AuthContext } from '../../Provider/Provider';
import HomeWork from './HomeWork/HomeWork';
import ShowEmptyTask from '../../Dashboard/ShowTasks/ShowEmptyTask';

const HomePage = () => {
  const {user} =useContext(AuthContext)
  return (
    <div>
      <div>

        <div className='bg-white'><Hero></Hero></div>

        
        {
          user 
          ? <ShowTasks></ShowTasks>
          : <ShowEmptyTask></ShowEmptyTask>
        }

        


        <div className=''>
          <HomeWork></HomeWork>
        </div>

      </div>
    </div>
  );
};

export default HomePage;