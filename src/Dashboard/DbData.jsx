import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import useAxiosSecure from '../hooks/useAxiosSecure';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DbData = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks and FAQs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const tasksResponse = await axiosSecure.get('/tasks');
        setTasks(tasksResponse.data);
        const faqsResponse = await axiosSecure.get('/interview-faqs');
        setFaqs(faqsResponse.data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  // Task Summary
  const taskSummary = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === 'todo').length,
    inProgress: tasks.filter((task) => task.status === 'in-progress').length,
    completed: tasks.filter((task) => task.status === 'completed').length,
  };

  // Task Completion Rate
  const completionRate =
    taskSummary.total > 0
      ? ((taskSummary.completed / taskSummary.total) * 100).toFixed(1)
      : 0;

  // FAQ Category Breakdown
  const faqCategories = faqs.reduce((acc, faq) => {
    acc[faq.category] = (acc[faq.category] || 0) + 1;
    return acc;
  }, {});
  const mostActiveCategory = Object.entries(faqCategories).reduce(
    (max, [category, count]) => (count > max.count ? { category, count } : max),
    { category: 'None', count: 0 }
  );

  // Pie Chart Data for Task Status
  const taskChartData = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [taskSummary.todo, taskSummary.inProgress, taskSummary.completed],
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
      },
    ],
  };

  // Bar Chart Data for FAQ Categories
  const faqChartData = {
    labels: Object.keys(faqCategories),
    datasets: [
      {
        label: 'FAQs per Category',
        data: Object.values(faqCategories),
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="m-4 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Account Dashboard</h1>

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
            <p className="text-2xl font-bold">{taskSummary.todo}</p>
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
          <p className="mt-4 text-gray-400">No tasks found.</p>
        )}
      </div>

      {/* FAQ Overview Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Interview FAQs</h2>
          <Link
            to="/dashboard/AddInterviewFAQ"
            className="bg-[#FB2C36] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Add FAQ
          </Link>
        </div>
        {/* FAQ Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4">FAQ Category Breakdown</h3>
          <div className="max-w-2xl mx-auto">
            <Bar
              data={faqChartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, title: { display: true, text: 'Number of FAQs' } },
                  x: { title: { display: true, text: 'Category' } },
                },
              }}
            />
          </div>
        </div>
        {/* Recent FAQs */}
        {faqs.length > 0 ? (
          <div className="space-y-2">
            {faqs.slice(0, 3).map((faq) => (
              <div
                key={faq._id}
                className="bg-gray-900 p-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{faq.question}</p>
                  <p className="text-sm text-gray-400">
                    Category: {faq.category}
                  </p>
                </div>
                <Link
                  to="/dashboard/DashInterViewFAQs"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No FAQs found.</p>
        )}
        {faqs.length > 3 && (
          <Link
            to="/dashboard/DashInterViewFAQs"
            className="block mt-4 text-blue-400 hover:text-blue-300"
          >
            View All FAQs
          </Link>
        )}
      </div>

      {/* Analysis Section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Analysis & Insights</h2>
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
            <h3 className="text-lg font-medium">Most Active FAQ Category</h3>
            <p className="text-gray-300">
              The category "{mostActiveCategory.category}" has the most FAQs with{' '}
              {mostActiveCategory.count} entries.{' '}
              {mostActiveCategory.count > 0
                ? 'This indicates a strong focus in this area.'
                : 'Add some FAQs to start building your knowledge base.'}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Task Activity Trend</h3>
            <p className="text-gray-300">
              You have {taskSummary.inProgress} tasks in progress and{' '}
              {taskSummary.todo} tasks pending.{' '}
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

export default DbData;