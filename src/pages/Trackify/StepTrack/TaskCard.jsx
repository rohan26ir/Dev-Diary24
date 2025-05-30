import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const TaskCard = ({ track, index, deleteTask, updateTask, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: track._id, index, category: track.category, serial: track.serial },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item, monitor) => {
      if (item.id === track._id || item.category !== track.category) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = monitor.getClientOffset();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const position = hoverClientY < hoverMiddleY ? 'above' : 'below';
      item.index = hoverIndex;
      moveTask(item.id, track.category, track.serial, position);
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTrack, setEditedTrack] = useState({
    title: track.title,
    description: track.description,
  });

  const handleEditClick = () => setIsEditing(true);

  const handleSave = () => {
    if (
      editedTrack.title !== track.title ||
      editedTrack.description !== track.description
    ) {
      updateTask(track._id, editedTrack);
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`bg-white p-3 rounded-md shadow-sm mb-3 ${isDragging ? 'opacity-50' : ''}`}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            className="w-full text-orange-500 border p-1 rounded-md mb-2"
            value={editedTrack.title}
            onChange={(e) => setEditedTrack({ ...editedTrack, title: e.target.value })}
          />
          <textarea
            className="w-full text-black border p-1 rounded-md"
            value={editedTrack.description}
            onChange={(e) => setEditedTrack({ ...editedTrack, description: e.target.value })}
          />
          <div className="flex justify-end mt-2">
            <button className="text-green-500 text-sm mr-2" onClick={handleSave}>
              Save
            </button>
            <button className="text-gray-500 text-sm" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="font-medium text-blue-600">{track.title}</h4>
          <p className="text-sm text-gray-600">{track.description}</p>
          <p className="text-xs text-gray-500">Serial: {track.serial}</p>
          <div className="flex justify-between mt-2">
            <button onClick={handleEditClick} className="text-blue-500 text-sm">
              Edit
            </button>
            <button onClick={() => deleteTask(track._id)} className="text-red-500 text-sm">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

TaskCard.propTypes = {
  track: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    serial: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
};

export default TaskCard;