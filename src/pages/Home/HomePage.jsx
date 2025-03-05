import React, { useContext } from 'react';
import HomeTask from './Task/HomeTask';
import ShowTasks from '../../Dashboard/ShowTasks/ShowTasks';
import Hero from './Hero/Hero';
import { AuthContext } from '../../Provider/Provider';

const HomePage = () => {
  const {user} =useContext(AuthContext)
  return (
    <div>
      <div>

        <div className='bg-white'><Hero></Hero></div>

        {
          user && <div><ShowTasks></ShowTasks></div>
        }

        {/* <div><ShowTasks></ShowTasks></div> */}

      </div>
    </div>
  );
};

export default HomePage;