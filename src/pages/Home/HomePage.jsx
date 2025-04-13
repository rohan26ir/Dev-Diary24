import React, { useContext } from 'react';
import HomeTask from './Task/HomeTask';
import ShowTasks from '../../Dashboard/ShowTasks/ShowTasks';
import Hero from './Hero/Hero';
import { AuthContext } from '../../Provider/Provider';
import HomeWork from './HomeWork/HomeWork';
import ShowEmptyTask from '../../Dashboard/ShowTasks/ShowEmptyTask';
import Loading from '../../Shared/Loading';
import Support from './components/Support';
import Counter from './components/Counter';

const HomePage = () => {
  const {user} =useContext(AuthContext)
  return (
    <div>
      <div>

        <div className='bg-white'>
          <Hero></Hero>
        </div>

        <div>
          <Counter></Counter>
        </div>

        <div className='mt-5'>
          <ShowEmptyTask></ShowEmptyTask>
        </div>

        <div className='mt-5'>
          
        {
          user && <ShowTasks></ShowTasks>
          
        }
        </div>


        {/* <Loading></Loading> */}
        


        <div className='pt-5'>
          <HomeWork></HomeWork>
        </div>

        <div className=''>
          <Support></Support>
        </div>

      </div>
    </div>
  );
};

export default HomePage;