import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/Provider';
import moment from 'moment-timezone';

const AddTasks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Define state for form fields
  const [taskData, setTaskData] = useState({
    name: '',
    // subject: '',
    title: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    url: '',
    status: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Convert local time to UTC before submitting the form
  const convertToUTC = (localDateTime) => {
    return moment(localDateTime).tz(moment.tz.guess()).utc().format();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      // Convert start and end times to UTC
      const taskPayload = {
        ...taskData,
        startDateTime: convertToUTC(taskData.startDateTime),
        endDateTime: convertToUTC(taskData.endDateTime),
        email: user?.email
      };

      // Send task data to backend
      await axiosSecure.post('/tasks', taskPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
        }
      });

      // Handle successful task creation
      setMessage('Task created successfully!');
      setTaskData({
        name: '',
        // subject: '',
        title: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        url: '',
        status: ''
      });
    } catch (err) {
      // Handle error
      if (err.response) {
        setMessage(err.response.data.message || 'Failed to create task. Please try again.');
      } else if (err.request) {
        setMessage('Failed to reach the server. Please check your connection or the server status.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
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
              className="input input-bordered w-full text-black"
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
              className="select select-bordered w-full text-black"
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          </div>

          {/* <div className="form-control">
            <label htmlFor="subject" className="label">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={taskData.subject}
              onChange={handleInputChange}
              className="input input-bordered w-full  text-black"
              required
            />
          </div> */}

          <div className="form-control">
            <label htmlFor="title" className="label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              className="input input-bordered w-full text-black"
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
              className="textarea textarea-bordered w-full text-black"
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
              className="input input-bordered w-full text-black"
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
              className="input input-bordered w-full text-black"
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
              className="input input-bordered w-full text-black"
            />
          </div>

          

          <div className="form-control mt-4 text-black">
            <button
              type="submit"
              className={`px-3 py-2 rounded-lg cursor-pointer ${loading ? 'btn-disabled' : 'bg-[#FB2C36]'} w-full`}
              disabled={loading}
            >
              {loading ? 'Creating Task...' : 'Add Task'}
            </button>
          </div>
        </form>

        {message && <p className="mt-4 text-center text-lg">{message}</p>}
      </div>
    </div>
  );
};

export default AddTasks;
