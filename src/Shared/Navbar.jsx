import React, { useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { RiMenuLine } from "react-icons/ri";
import { AuthContext } from '../Provider/Provider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const drawerRef = useRef(null); // Reference to the drawer content
  const checkboxRef = useRef(null); // Reference to the checkbox input
  const location = useLocation(); // Track URL changes

  // Define activeStyle as a string with the necessary classes
  const activeStyle = "bg-white/20 text-white px-3 py-2 rounded";

  // Close drawer function
  const closeDrawer = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  // Handle clicks outside the drawer
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        checkboxRef.current.checked
      ) {
        closeDrawer();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close drawer on URL change
  useEffect(() => {
    closeDrawer();
  }, [location]);

  const navBar = (
    <>
      <li>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2")}
          onClick={closeDrawer} // Close drawer on click
        >
          Home
        </NavLink>
      </li>
      {user && (
        <li>
        <NavLink
          to={'/my-InterviewFAQ'}
          className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2")}
          onClick={closeDrawer} // Close drawer on click
        >
        Dev FAQ
        </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to={'/note'}
          className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2")}
          onClick={closeDrawer}
        >
          Note
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/code'}
          className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2")}
          onClick={closeDrawer}
        >
          Code
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/link'}
          className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2")}
          onClick={closeDrawer}
        >
          Lists
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/InterviewFAQs'}
          className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2")}
          onClick={closeDrawer}
        >
          DevFAQs
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="">
      <div className="navbar shadow-sm px-5 border-b-[1px] border-gray-700">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          <Link to={"/"} className="text-xl font-bold text-[#C70039] md:text-white">
            DevDiary24
          </Link>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{navBar}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-4">
          {/* Profile Section (Desktop) */}
          <div className="hidden md:block">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="User Avatar" src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 shadow text-black"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <NavLink to={'/dashboard/AddTask'} className="pl-2.5">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={logOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={"/Account/SignIn"} onClick={closeDrawer}>
                <button className="bg-[#FB2C36]/90 hover:bg-[#FB2C36]/80 px-3 py-2 rounded-sm">
                  Sign Up
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <div className="drawer z-10">
              <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                ref={checkboxRef}
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer"
                  className="drawer-button font-bold text-2xl cursor-pointer"
                >
                  <RiMenuLine />
                </label>
              </div>
              <div className="drawer-side flex flex-col justify-between h-full">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul
                  className="menu bg-black text-white min-h-full w-80 p-4"
                  ref={drawerRef}
                >
                  <div className="flex justify-between items-center mb-4">
                  <Link to={"/"} className="text-xl font-bold text-[#C70039] md:text-white">
                    DevDiary24
                  </Link>
                    <label
                      htmlFor="my-drawer"
                      className="bg-white/20 px-3 py-1 rounded-lg cursor-pointer"
                    >
                      Close
                    </label>
                  </div>
                  <div className="grow">
                    {navBar}
                    {user ? (
                      <ul className="mt-4">
                        <li>
                          <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </a>
                        </li>
                        <li>
                          <NavLink
                            to={'/dashboard/AddTask'}
                            className="pl-2.5"
                            onClick={closeDrawer}
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <button onClick={() => { logOut(); closeDrawer(); }}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <Link to={"/Account/SignIn"} onClick={closeDrawer}>
                        <button className="bg-[#FB2C36]/90 hover:bg-[#FB2C36]/80 px-3 py-2 rounded-sm w-full mt-4">
                          Sign Up
                        </button>
                      </Link>
                    )}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;