import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";
import { PiSubtitlesBold } from "react-icons/pi";
import { toast } from "react-toastify";

const ShowTasks = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(() => {
      setTasks((prevTasks) => [...prevTasks]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks", { withCredentials: true });
      const filteredTasks = res.data.filter(task => task.remove !== "Yes"); // Exclude removed tasks
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };
  

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axiosSecure.patch(`/tasks/${taskId}/status`, { status: newStatus }, { withCredentials: true });
      setTasks((prevTasks) => prevTasks.map(task => task._id === taskId ? { ...task, status: newStatus } : task));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axiosSecure.patch(`/tasks/${taskId}/remove`, {}, { withCredentials: true });
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId)); // Remove from UI
      toast.success("Task removed successfully!");
    } catch (error) {
      console.error("Error removing task:", error);
      toast.error("Failed to remove task.");
    }
  };
  
  

  const calculateRemainingTime = (endDateTime) => {
    const now = moment();
    const end = moment(endDateTime);
    const duration = moment.duration(end.diff(now));
    return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, {});

  return (
    <div className="w-[100%] mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div key={status} className="mb-6 ">
          <h3 className="text-xl font-semibold mb-2 capitalize">{status}</h3>

          <div className="grid md:grid-cols-2  gap-4">
            {tasks.map((task) => (
              <div key={task._id} className="flex flex-col border p-4 shadow-md rounded-lg bg-white/30 text-black ">
                
                {/* top */}
                <div className="flex justify-between gap-3 grow pb-2">
                <div>
                <h3 className="text-lg font-semibold">Institution: {task.name}</h3>
                <h3 className="text-lg font-semibold flex items-center gap-1"><PiSubtitlesBold /> {task.title}</h3>
                <p className="text-gray-100">{task.description.length > 200 ? task.description.substring(0, 100) + "..." : task.description}</p>
                <p className="text-sm text-gray-400">Start: {moment(task.startDateTime).format("MMM DD, YYYY hh:mm A")}</p>
                <p className="text-sm text-gray-200">Deadline: {moment(task.endDateTime).format("MMM DD, YYYY hh:mm A")}</p>
                </div>
                
                <div className="btn">
                <p className="font-semibold text-red-500"> {calculateRemainingTime(task.endDateTime)}</p>
                
                
                
                </div>

                </div>


                {/* bottom */}
                <div className="flex justify-between items-end pt-2 border-t-[1px] border-gray-500 ">
                  <div>
                  <a href={task.url} target="_blank" rel="noopener noreferrer" className=""><button className="p-2 bg-sky-800 text-black rounded-md w-full hover:bg-sky-900 underline">Task Link</button></a>
                  </div>
                  <div>
                  <select
                  className=" p-2 border rounded-md w-full"
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                  </div>
                  <div>
                    <button 
                  className=" p-2 bg-red-500 text-white rounded-md w-full hover:bg-red-600"
                  onClick={() => removeTask(task._id)}
                >
                  Remove
                </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTasks;
