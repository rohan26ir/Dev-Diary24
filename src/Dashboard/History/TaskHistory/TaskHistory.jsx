import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const TaskHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    fetchDeletedTasks();
  }, []);

  const fetchDeletedTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks", { withCredentials: true });
      const removedTasks = res.data.filter(task => task.remove === "Yes"); // Fetch only removed tasks
      setDeletedTasks(removedTasks);
    } catch (error) {
      console.error("Error fetching removed tasks:", error);
    }
  };

  const deleteTaskPermanently = async (taskId) => {
    try {
      await axiosSecure.delete(`/tasks/${taskId}`, { withCredentials: true });
      setDeletedTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
      toast.success("Task deleted permanently!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Deleted Task History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-y-gray-900 text-white">
          <thead>
            <tr className="bg-black">
              <th className="p-3 border">Institution</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Start Date</th>
              <th className="p-3 border">Deadline</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deletedTasks.length > 0 ? (
              deletedTasks.map((task) => (
                <tr key={task._id} className="text-center bg-white/10 border-b border-gray-700">
                  <td className="p-3 border">{task.name}</td>
                  <td className="p-3 border">{task.title}</td>
                  <td className="p-3 border">{new Date(task.startDateTime).toLocaleString()}</td>
                  <td className="p-3 border">{new Date(task.endDateTime).toLocaleString()}</td>
                  <td className="p-3 border">
                    <button 
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => deleteTaskPermanently(task._id)}
                    >
                      Delete Permanently
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-3 text-gray-400">No deleted tasks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskHistory;
