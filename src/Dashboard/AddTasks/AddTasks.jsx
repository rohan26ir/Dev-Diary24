import React, { useContext, useState } from 'react';
import moment from 'moment-timezone';
import { AuthContext } from '../../Provider/Provider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddTasks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [taskData, setTaskData] = useState({
    name: '',
    subject: '', // Added subject to match backend
    title: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    url: '',
    status: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const convertToUTC = (localDateTime) => {
    return moment(localDateTime).utc().format(); // ISO 8601 UTC string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const taskPayload = {
        ...taskData,
        startDateTime: convertToUTC(taskData.startDateTime),
        endDateTime: convertToUTC(taskData.endDateTime),
        email: user?.email,
      };

      // console.log('Task Payload:', taskPayload); // Fixed console.log syntax

      const response = await axiosSecure.post('/tasks', taskPayload); // Await the POST request

      setMessage('Task created successfully!');
      setTaskData({
        name: '',
        subject: '', // Reset subject
        title: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        url: '',
        status: '',
        email: user?.email,
      });
    } catch (err) {
      console.error('Error creating task:', err); // Use console.error for errors
      if (err.response) {
        setMessage(err.response.data.message || 'Failed to create task. Please try again.');
      } else if (err.request) {
        setMessage('Failed to reach the server. Please check your connection.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white/10 p-5'>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl text-center text-gray-200 font-bold mb-6">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-col sm:flex-row justify-between gap-5'>
            <div className="form-control w-full">
              <label htmlFor="name" className="label">Institution/Medium</label>
              <input
                type="text"
                id="name"
                name="name"
                value={taskData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-black text-white"
                required
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="status" className="label">Status</label>
              <select
                id="status"
                name="status"
                value={taskData.status}
                onChange={handleInputChange}
                className="select select-bordered w-full bg-black text-white"
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="subject" className="label">Subject</label> {/* Added subject field */}
            <input
              type="text"
              id="subject"
              name="subject"
              value={taskData.subject}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-black text-white"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="title" className="label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-black text-white"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="description" className="label">Description</label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full bg-black text-white"
              required
            />
          </div>

          <div className='flex flex-col sm:flex-row justify-between gap-5'>
            <div className="form-control w-full">
              <label htmlFor="startDateTime" className="label">Start Date & Time</label>
              <input
                type="datetime-local"
                id="startDateTime"
                name="startDateTime"
                value={taskData.startDateTime}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-white/5 text-white"
                required
              />
            </div>

            <div className="form-control w-full">
              <label htmlFor="endDateTime" className="label">End Date & Time</label>
              <input
                type="datetime-local"
                id="endDateTime"
                name="endDateTime"
                value={taskData.endDateTime}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-white/5 text-white"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="url" className="label">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={taskData.url}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-black text-white"
            />
          </div>

          <div className="form-control mt-4 text-black">
            <button
              type="submit"
              className={`px-3 py-2 rounded-lg text-white font-bold cursor-pointer ${loading ? 'btn-disabled bg-gray-500' : 'bg-[#FB2C36]'} w-full`}
              disabled={loading}
            >
              {loading ? 'Creating Task...' : 'Add Task'}
            </button>
          </div>
        </form>

        {message && (
          <p className={`mt-4 text-center text-lg font-semibold ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddTasks;