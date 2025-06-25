import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Account = () => {
  return (
    <div className='min-h-screen flex items-start pt-[1%] justify-center'>
      <div className=' md:w-[100%] lg:w-[700px] lg:h-[100%] bg-white/10  text-black shadow-2xl py-2 rounded-lg '>

        {/* Sign Up & Sign In Buttons */}
        <div className='flex gap-2 p-5 '>
          <NavLink 
            to="/account/signup" 
            className={({ isActive }) =>
              `w-full text-center py-2 rounded-lg transition ${
                isActive ? 'bg-[#FB2C36] text-white' : 'bg-gray-200 text-black'
              }`
            }
          >
            Sign Up
          </NavLink> 
          <NavLink 
            to="/account/signin" 
            className={({ isActive }) =>
              `w-full text-center py-2 rounded-lg transition ${
                isActive ? 'bg-[#FB2C36] text-white' : 'bg-gray-200 text-black'
              }`
            }
          >
            Sign In
          </NavLink> 
        </div>

        {/* Outlet for displaying SignIn or SignUp forms */}
        <div className='px-5 pb-5 h-[100%] w-[100%]'>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Account;
