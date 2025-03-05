import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";

const ShowTasks = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
    const timer = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          remainingTime: calculateRemainingTime(
            task.startDateTime,
            task.endDateTime,
            task.status
          ),
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks", { withCredentials: true });
      setTasks(res.data); // The fetched tasks will only be from the logged-in user
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/tasks/${id}/status`, { status });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, status } : task
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const calculateRemainingTime = (start, end, status) => {
    if (status === "Complete") return "Completed";

    const now = moment();
    const startTime = moment(start);
    const endTime = moment(end);

    if (now.isBefore(startTime)) {
      return `Starts in ${formatDuration(moment.duration(startTime.diff(now)))}`;
    } else if (now.isAfter(endTime)) {
      return "Time Expired";
    } else {
      return `Ends in ${formatDuration(moment.duration(endTime.diff(now)))}`;
    }
  };

  const formatDuration = (duration) => {
    return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
  };

  const groupedTasks = {
    Pending: tasks.filter((task) => task.status === "Pending"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Complete: tasks.filter((task) => task.status === "Complete"),
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      {error && <p className="text-red-500">{error}</p>}

      {Object.entries(groupedTasks).map(([status, taskList]) => (
        <div key={status} className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">{status}</h3>
          <div className="grid gap-4">
            {taskList.length > 0 ? (
              taskList.map((task) => (
                <div key={task._id} className="border p-4 shadow-md rounded-lg bg-white">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Start: {moment(task.startDateTime).format("MMM DD, YYYY hh:mm A")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Deadline: {moment(task.endDateTime).format("MMM DD, YYYY hh:mm A")}
                  </p>
                  <p className="font-semibold text-red-500">{task.remainingTime}</p>
                  <div className="mt-4 flex justify-between items-center">
                    {task.status !== "Complete" && (
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task._id, e.target.value)}
                        className="border px-3 py-1 rounded-md"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Complete">Complete</option>
                      </select>
                    )}
                    {task.status !== "Complete" && (
                      <button
                        onClick={() => updateStatus(task._id, "Complete")}
                        className="bg-green-500 text-white px-3 py-1 rounded-md"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks in this category.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTasks;
