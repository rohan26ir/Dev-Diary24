import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const TaskColumn = ({ category, track, moveTask, deleteTask, updateTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item, monitor) => {
      if (item.category !== category) {
        // Handle cross-column drops (place at the end)
        moveTask(item.id, category, null, 'below');
      }
    },
  });

  return (
    <div ref={drop} className="bg-gray-100 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-4">{category}</h3>
      {track.length === 0 ? (
        <p className="text-gray-500">No tasks in this category</p>
      ) : (
        track.map((task, index) => (
          <TaskCard
            key={task._id}
            track={task}
            index={index}
            deleteTask={deleteTask}
            updateTask={updateTask}
            moveTask={moveTask}
          />
        ))
      )}
    </div>
  );
};

TaskColumn.propTypes = {
  category: PropTypes.string.isRequired,
  track: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      category: PropTypes.string.isRequired,
      serial: PropTypes.number.isRequired,
    })
  ).isRequired,
  moveTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskColumn;