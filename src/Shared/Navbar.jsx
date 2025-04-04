import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiMenuLine } from "react-icons/ri";
import { AuthContext } from '../Provider/Provider';

const Navbar = () => {

  const {user, logOut} = useContext(AuthContext);


  console.log("Nab",user);

  // Define activeStyle as a string with the necessary classes
  const activeStyle = "bg-white/20 text-white px-3 py-2 rounded";

  const navBar = <>
    <li>
      <NavLink to={'/'} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
        Home
      </NavLink>
    </li>
    <li>
      <details className=''>
        <summary className=''>Interview</summary>
        <ul className="p-2 text-white bg-[#FB2C36]/60">
          <li>
            <NavLink to={"/my-InterviewFAQ"} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
            InterviewFAQ
            </NavLink>
          </li>
          <li>
            <NavLink to={"/interview/InterParsonal"} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
              InterPer
            </NavLink>
          </li>
          <li>
            <NavLink to={"/interview/theory"} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
              Theory
            </NavLink>
          </li>
          <li>
            <NavLink to={"/interview/problem-solving"} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
              PSol
            </NavLink>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <NavLink to={'/note'} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
        Note
      </NavLink>
    </li>
    <li>
      <NavLink to={'/code'} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
        Code
      </NavLink>
    </li>
    <li>
      <NavLink to={'/link'} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
        Link
      </NavLink>
    </li>
    <li>
      <NavLink to={'/InterviewFAQs'} className={({ isActive }) => isActive ? activeStyle : "px-3 py-2"}>
      InterviewFAQs
      </NavLink>
    </li>
  </>;

  return (
    <div className=''>
      <div className="navbar bg-black text-white shadow-sm px-5 border-b-[1px] border-gray-700 ">
        <div className="navbar-start flex gap-2 justify-between">
          {/* Mobile Menu */}
          <div className="drawer md:hidden z-10">
            <input id="my-drawer" type="checkbox" className="drawer-toggle " />
            <div className="drawer-content ">
              <label htmlFor="my-drawer" className=" drawer-button font-bold text-2xl">
                <RiMenuLine />
              </label>
            </div>
            <div className="drawer-side flex flex-col justify-between h-full">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-black text-white min-h-full w-80 p-4">
                <div className="flex justify-between items-center ">
                  <div>
                    <Link to={"/"}><h2 className='text-2xl font-bold '>Home</h2></Link>
                  </div>
                  <label htmlFor="my-drawer" className="bg-white/20 drawer-button px-3 py-1 rounded-lg">Close</label>
                </div>
                <div className='grow'>
                  {navBar}
                </div>
              </ul>
            </div>
          </div>

          {/* Logo */}
          <div className='hidden md:block'>
            <Link to={"/"} title='DevDiary' className="text-xl text-white font-bold">DevDiary24</Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden md:block lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navBar}
          </ul>
        </div>

        <div className='block md:hidden'>
          <Link to={"/"} className="text-xl text-[#C70039] font-bold">DevDiary</Link>
        </div>

        {/* Profile Section */}
        <div className="navbar-end">

          {
            user 
            ?  <div className="dropdown dropdown-end  ">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ">
                <img
                  alt="User Avatar"
                  src={user.photoURL} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52  shadow  text-black ">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <NavLink to={'/dashboard/AddTask'}><li className='pl-2.5'>Dashboard</li></NavLink>
              <li><button onClick={logOut}>Logout</button></li>
            </ul>
          </div>

          :  <div>
          <Link to={"/Account/SignIn"}><button className='bg-[#FB2C36]/90 hover:bg-[#FB2C36]/80 px-3 py-2 rounded-sm cursor-pointer'>Sign Up</button></Link>
        </div>

          }

         

        </div>
      </div>
    </div>
  );
};

export default Navbar;
