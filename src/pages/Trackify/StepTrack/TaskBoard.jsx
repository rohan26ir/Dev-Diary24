import React, { useContext, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/Provider';
import TaskColumn from './TaskColumn';
import Loading from "../../../Shared/Loading";

const TaskBoard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [track, setTrack] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchTrack();
    } else {
      setError('Please log in to view tasks');
    }
  }, [user]);

  const fetchTrack = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosSecure.get('/track');
      const tracks = Array.isArray(response.data.data) ? response.data.data : [];
      setTrack(tracks);
    } catch (error) {
      console.error('Error fetching track:', error);
      setError(error.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const moveTask = async (id, category, targetSerial, position) => {
    setError(null);
    const previousTrack = [...track];
    try {
      // Optimistically update the local state
      let updatedTracks = [...track];
      const movedTrackIndex = updatedTracks.findIndex((t) => t._id === id);
      if (movedTrackIndex === -1) return;

      const movedTrack = { ...updatedTracks[movedTrackIndex], category };
      updatedTracks.splice(movedTrackIndex, 1);

      if (targetSerial === null) {
        // Cross-column drop (place at the end)
        const tracksInCategory = updatedTracks.filter((t) => t.category === category);
        const maxSerial = tracksInCategory.length > 0 ? Math.max(...tracksInCategory.map((t) => t.serial)) : 0;
        movedTrack.serial = maxSerial + 1;
        updatedTracks.push(movedTrack);
      } else {
        // Same-column reordering
        const targetIndex = updatedTracks.findIndex((t) => t.serial === targetSerial && t.category === category);
        let insertIndex = position === 'above' ? targetIndex : targetIndex + 1;
        if (targetIndex < 0) insertIndex = updatedTracks.filter((t) => t.category === category).length;
        updatedTracks.splice(insertIndex, 0, movedTrack);

        // Reassign serial numbers for the category
        const tracksInCategory = updatedTracks.filter((t) => t.category === category).sort((a, b) => {
          const aIndex = updatedTracks.findIndex((x) => x._id === a._id);
          const bIndex = updatedTracks.findIndex((x) => x._id === b._id);
          return aIndex - bIndex;
        });
        tracksInCategory.forEach((t, i) => {
          t.serial = i + 1;
        });
      }

      setTrack(updatedTracks);

      // Sync with backend
      const response = await axiosSecure.put(`/track/${id}`, {
        category,
        targetSerial,
        position,
      });

      // Update state with backend response
      const affectedTracks = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
      setTrack((prevTrack) =>
        prevTrack.map((t) => {
          const updated = affectedTracks.find((at) => at._id.toString() === t._id);
          return updated || t;
        })
      );
    } catch (error) {
      console.error('Error updating track:', error);
      setTrack(previousTrack);
      setError(error.message || 'Failed to move task');
    }
  };

  const deleteTask = async (id) => {
    // console.log('Deleting task with ID:', id);
    setError(null);
    const previousTrack = [...track];
    try {
      // Optimistically remove the task
      const deletedTrack = track.find((t) => t._id === id);
      let updatedTracks = track.filter((t) => t._id !== id);

      // Reassign serial numbers for the category
      if (deletedTrack) {
        const tracksInCategory = updatedTracks
          .filter((t) => t.category === deletedTrack.category)
          .sort((a, b) => a.serial - b.serial);
        tracksInCategory.forEach((t, i) => {
          t.serial = i + 1;
        });
      }

      setTrack(updatedTracks);

      // Sync with backend
      await axiosSecure.delete(`/track/${id}`);
    } catch (error) {
      console.error('Error deleting track:', error);
      setTrack(previousTrack);
      setError(error.message || 'Failed to delete task');
    }
  };

  const updateTask = async (id, updatedTrack) => {
    setError(null);
    const previousTrack = [...track];
    try {
      // Optimistically update the task
      setTrack((prevTrack) =>
        prevTrack.map((track) =>
          track._id === id ? { ...track, ...updatedTrack } : track
        )
      );

      // Sync with backend
      const response = await axiosSecure.put(`/track/${id}`, updatedTrack);
      setTrack((prevTrack) =>
        prevTrack.map((track) =>
          track._id === id ? { ...track, ...response.data.data } : track
        )
      );
    } catch (error) {
      console.error('Error updating track:', error);
      setTrack(previousTrack);
      setError(error.message || 'Failed to update task');
    }
  };

  // console.log('track', track);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">My Tasks Track</h2>
        {loading && <Loading></Loading>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-rose-600">
            {['To-Do', 'In Progress', 'Done'].map((category) => (
              <TaskColumn
                key={category}
                category={category}
                track={track
                  .filter((track) => track.category === category)
                  .sort((a, b) => a.serial - b.serial)}
                moveTask={moveTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TaskBoard;