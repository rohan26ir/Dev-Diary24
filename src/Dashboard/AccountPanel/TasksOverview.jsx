import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/Provider';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TasksOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [taskSummary, setTaskSummary] = useState({
    total: 0,
    pending: 0,
    Progress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch tasks on component mount
  useEffect(() => {
    if (!user?.email) {
      setError('User not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const tasksResponse = await axiosSecure.get('/tasks', {
          params: { email: user.email },
        });
        if (isMounted) {
          const tasksData = tasksResponse.data && Array.isArray(tasksResponse.data) ? tasksResponse.data : [];
          setTasks(tasksData);

          // Update task summary
          setTaskSummary({
            total: tasksData.length,
            pending: tasksData.filter((task) => task.status === 'pending').length,
            inProgress: tasksData.filter((task) => task.status === 'in-progress').length,
            completed: tasksData.filter((task) => task.status === 'completed').length,
          });
        }
      } catch (err) {
        if (isMounted) {
          if (err.response?.status === 404 || err.response?.status === 400) {
            setTasks([]);
            setTaskSummary({ total: 0, pending: 0, inProgress: 0, completed: 0 });
          } else {
            const errorMessage = err.response
              ? `Server error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`
              : err.message || 'Failed to connect to the server. Please check your network or try again later.';
            setError(errorMessage);
            console.error('Error fetching tasks:', err);
            setTasks([]);
            setTaskSummary({ total: 0, pending: 0, inProgress: 0, completed: 0 });
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTasks();

    return () => {
      isMounted = false;
    };
  }, [axiosSecure, user]);

  // Task Completion Rate
  const completionRate =
    taskSummary.total > 0
      ? ((taskSummary.completed / taskSummary.total) * 100).toFixed(1)
      : 0;

  // Pie Chart Data for Task Status
  const taskChartData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [taskSummary.pending, taskSummary.inProgress, taskSummary.completed],
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl">Loading Tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl text-red-500">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="m-4 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>

      {/* Task Overview Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Tasks Overview</h2>
          <Link
            to="/dashboard/AddTask"
            className="bg-[#FB2C36] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Add Task
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium">Total Tasks</h3>
            <p className="text-2xl font-bold">{taskSummary.total}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium">To Do</h3>
            <p className="text-2xl font-bold">{taskSummary.pending}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium">In Progress</h3>
            <p className="text-2xl font-bold">{taskSummary.inProgress}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium">Completed</h3>
            <p className="text-2xl font-bold">{taskSummary.completed}</p>
          </div>
        </div>
        {/* Task Pie Chart */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Task Status Distribution</h3>
          <div className="max-w-xs mx-auto">
            <Pie
              data={taskChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
              }}
            />
          </div>
        </div>
        {/* Recent Tasks */}
        {tasks.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Recent Tasks</h3>
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-900 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-400">
                      Status: {task.status}
                    </p>
                  </div>
                  <Link
                    to="/dashboard/History"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-400">No tasks found. Start by adding a task!</p>
        )}
      </div>

      {/* Analysis Section (Task-Specific) */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Task Insights</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Task Completion Rate</h3>
            <p className="text-gray-300">
              {completionRate}% of your tasks are completed.{' '}
              {completionRate > 50
                ? 'Great job staying on top of your tasks!'
                : 'Consider prioritizing task completion to boost productivity.'}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Task Activity Trend</h3>
            <p className="text-gray-300">
              You have {taskSummary.inProgress} tasks in progress and{' '}
              {taskSummary.pending} tasks pending.{' '}
              {taskSummary.inProgress > taskSummary.completed
                ? 'You’re actively working on multiple tasks!'
                : 'Focus on starting pending tasks to maintain momentum.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksOverview;