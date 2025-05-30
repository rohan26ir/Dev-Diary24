import { useContext, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../Provider/Provider";
import TaskColumn from "../TaskColumn";

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
      setTrack(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const updateTrack = async (id, updatedTrack) => {
    setError(null);
    try {
      const response = await axiosSecure.put(`/track/${id}`, updatedTrack);
      setTrack((prevTrack) =>
        prevTrack.map((track) =>
          track._id === id ? { ...track, ...response.data.data } : track
        )
      );
    } catch (error) {
      console.error('Error updating track:', error);
      setError(error.message || 'Failed to update task');
    }
  };

  const moveTrack = async (id, newCategory) => {
    setError(null);
    try {
      const response = await axiosSecure.put(`/track/${id}`, { category: newCategory });
      setTrack((prevTrack) =>
        prevTrack.map((track) =>
          track._id === id ? { ...track, ...response.data.data } : track
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      setError(error.message || 'Failed to move task');
    }
  };

  const deleteTrack = async (id) => {
    setError(null);
    const previousTrack = [...track];
    setTrack(track.filter((t) => t._id !== id));
    try {
      await axiosSecure.delete(`/track/${id}`);
    } catch (error) {
      console.error('Error deleting track:', error);
      setTrack(previousTrack);
      setError(error.message || 'Failed to delete task');
    }
  };

  console.log('track:', track);
  console.log('deleteTrack:', deleteTrack);
  console.log('updateTrack:', updateTrack);

  // Categorizing tasks
  const toDoTrack = track.filter((track) => track.category === 'To-Do');
  const inProgressTrack = track.filter((track) => track.category === 'In Progress');
  const doneTrack = track.filter((track) => track.category === 'Done');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Tasks</h2>
      {loading && <p className="text-center text-blue-500">Loading tasks...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            category="To-Do"
            track={toDoTrack}
            moveTrack={moveTrack}
            deleteTrack={deleteTrack}
            updateTrack={updateTrack}
          />
          <TaskColumn
            category="In Progress"
            track={inProgressTrack}
            moveTrack={moveTrack}
            deleteTrack={deleteTrack}
            updateTrack={updateTrack}
          />
          <TaskColumn
            category="Done"
            track={doneTrack}
            moveTrack={moveTrack}
            deleteTrack={deleteTrack}
            updateTrack={updateTrack}
          />
        </div>
      )}
    </div>
  );
};

export default TaskBoard;