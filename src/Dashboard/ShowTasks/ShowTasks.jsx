import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";
import { PiSubtitlesBold } from "react-icons/pi";
import { toast } from "react-toastify";
import { MdOutlineSubject, MdOutlineTopic } from "react-icons/md";
import { AuthContext } from "../../Provider/Provider";

const ShowTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      setError("Please log in to view tasks.");
      return;
    }

    fetchTasks();
    const interval = setInterval(fetchTasks, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks"); // No need for withCredentials
      const filteredTasks = res.data.filter((task) => task.remove !== "Yes");
      setTasks(filteredTasks);
      setError("");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axiosSecure.patch(`/tasks/${taskId}/status`, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, status: newStatus } : task))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update task status.");
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axiosSecure.patch(`/tasks/${taskId}/remove`, {});
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
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

  const openModal = (task) => {
    setSelectedTask(task);
    document.getElementById("task_modal").showModal();
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, {});

  return (
    <div className="w-11/12 mx-auto text-white bg-black">
      {error && <p className="text-[#FB2C36] text-center mb-4">{error}</p>}

      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div key={status} className="mb-8">
          <h3 className="text-2xl font-bold mb-4 capitalize text-[#FB2C36] border-b-2 border-[#FB2C36] pb-2">
            {status}
          </h3>

          <div
            className={`${
              tasks.length === 1
                ? "flex flex-row gap-6"
                : "grid md:grid-cols-2 gap-6"
            }`}
          >
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`flex flex-col border border-white/20 p-5 rounded-xl bg-black/80 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  tasks.length === 1 ? "w-full" : ""
                }`}
              >
                <div className="flex justify-between items-center gap-4 pb-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
                      <PiSubtitlesBold className="text-[#FB2C36]" />
                      {task.title}
                    </h3>
                    <h4 className="text-lg font-medium flex items-center gap-2 text-white/80">
                      <MdOutlineTopic className="text-[#FB2C36]" /> {task.subject}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#FB2C36] text-lg px-4 py-2 bg-white/10 rounded-lg">
                      {calculateRemainingTime(task.endDateTime)}
                    </p>
                  </div>
                </div>

                <div className="pb-4">
                  <p
                    className="text-white/80 cursor-pointer hover:text-[#FB2C36] transition-colors duration-200 flex items-center gap-2"
                    onClick={() => openModal(task)}
                  >
                    <span className="text-[#FB2C36] text-2xl">
                      <MdOutlineSubject />
                    </span>
                    {task.description.length > 100
                      ? task.description.substring(0, 100) + "..."
                      : task.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    Task Link
                  </a>
                  <select
                    className="px-4 py-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#FB2C36] transition-all duration-200"
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                  >
                    <option className="bg-white/10" value="pending">
                      Pending
                    </option>
                    <option className="bg-white/10" value="in-progress">
                      In Progress
                    </option>
                    <option className="bg-white/10" value="completed">
                      Completed
                    </option>
                  </select>
                  <button
                    className="px-4 py-2 bg-[#FB2C36] text-white rounded-lg hover:bg-[#d9232d] transition-colors duration-200"
                    onClick={() => removeTask(task._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <dialog id="task_modal" className="modal">
        <div className="modal-box bg-black text-white border border-white/20">
          {selectedTask && (
            <>
              <h3 className="font-bold text-lg text-[#FB2C36]">
                {selectedTask.title}
              </h3>
              <p className="py-4 text-white/80">{selectedTask.description}</p>
              <p className="text-sm text-white/60">
                Start:{" "}
                {moment(selectedTask.startDateTime).format(
                  "MMM DD, YYYY hh:mm A"
                )}
              </p>
              <p className="text-lg text-[#FB2C36]">
                Deadline:{" "}
                {moment(selectedTask.endDateTime).format("MMM DD, YYYY hh:mm A")}
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="px-3 py-1 rounded-lg cursor-pointer bg-[#FB2C36] text-white hover:bg-[#d9232d]">
                    Close
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ShowTasks;