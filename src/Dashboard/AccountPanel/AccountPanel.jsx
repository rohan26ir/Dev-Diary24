import React from 'react';
import TasksOverview from './TasksOverview';
import FAQsOverview from './FAQsOverview';

const AccountPanel = () => {
  return (
    <div>
      
      {/* Task */}
       <div>
         <TasksOverview></TasksOverview>
       </div>
      {/* Task */}
        <div>
          <FAQsOverview></FAQsOverview>
        </div>

        
    </div>
  );
};

export default AccountPanel;