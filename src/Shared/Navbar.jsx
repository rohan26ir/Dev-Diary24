import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiMenuLine } from "react-icons/ri";

const Navbar = () => {

  const navBar = <>
    <li>
        <NavLink to={'/'}>Home</NavLink>
    </li>
      <li>
        <details>
          <summary>Interview</summary>
          <ul className="p-2">
            <li><NavLink to={"/"}>InterPer</NavLink></li>
            <li><NavLink to={"/"}>Theory</NavLink></li>
            <li><NavLink to={"/"}>PSol</NavLink></li>
          </ul>
        </details>
      </li>
      <li><NavLink to={'/'}>Note</NavLink></li>
      <li><NavLink to={'/'}>Code</NavLink></li>
      <li><NavLink to={'/'}>Link</NavLink></li>
  </>
  return (
    <div className=''>
      <div className="navbar bg-base-100 shadow-sm px-5">
  <div className="navbar-start  flex gap-2 justify-between">
    {/* demo */}
    <div className="drawer md:hidden">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn bg-rose-500 drawer-button font-bold text-2xl"><RiMenuLine /></label>
  </div>
  <div className="drawer-side flex flex-col justify-between h-full">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    

    <div className="flex justify-between items-center ">
      <div className=''>
        <Link to={"/"}><h2 className='text-2xl font-bold'>Home</h2></Link>
      </div>
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn bg-rose-600 drawer-button">Close </label>
   </div>


      <div className='grow'>
        {/* Sidebar content here */}
      {navBar}
      </div>


      

    </ul>

    
  </div>
</div>
    {/* demo end */}
    <div className='hidden  md:block'>
    <Link to={"/"} title='DevDiary ' className=" text-xl text-[#C70039] font-bold">DevDiary</Link>
    </div>
  </div>
  <div className="navbar-center hidden md:block lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      {navBar}
    </ul>

    
  </div>
  <div className='block md:hidden'>
    <Link to={"/"} className=" text-xl text-[#C70039] font-bold">DevDiary</Link>
    </div>
  <div className="navbar-end">
    
  <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>


    
  </div>
</div>
    </div>
  );
};

export default Navbar;