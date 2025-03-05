import React from 'react';
import HomeTask from './Task/HomeTask';
import ShowTasks from '../../Dashboard/ShowTasks/ShowTasks';

const HomePage = () => {
  return (
    <div>
      <div>
        {/* <HomeTask></HomeTask> */}



        <div>
          <ShowTasks></ShowTasks>
        </div>
      </div>
    </div>
  );
};

export default HomePage;