import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Provider/Provider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PostTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [track, setTrack] = useState({
    title: '',
    description: '',
    category: 'To-Do',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrack((prevTrack) => ({
      ...prevTrack,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await axiosSecure.post('/track', {
        title: track.title,
        description: track.description,
        category: track.category,
        userEmail: user.email,
      });

      console.log('Track added:', response.data);
      setTrack({ title: '', description: '', category: 'To-Do' }); // Reset form
      navigate('/Trackify');
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  return (
    <div className='p-10'>
      <div className="p-4 bg-white text-black shadow-md rounded-md max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={track.title}
            onChange={handleChange}
            placeholder="Task Title"
            maxLength="50"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={track.description}
            onChange={handleChange}
            placeholder="Task Description (optional)"
            maxLength="200"
            className="w-full p-2 border rounded"
          ></textarea>
          <select
            name="category"
            value={track.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>

        <div className='py-3 flex flex-col justify-center'>
          <Link to={'/Trackify'}>
            <button className='btn bg-black text-white w-full'>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostTask;
