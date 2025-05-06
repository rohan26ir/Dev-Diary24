import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiMenuLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { AuthContext } from '../Provider/Provider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the mobile menu container

  // Define activeStyle
  const activeStyle = "bg-white/20 text-white px-3 py-2 rounded";

  // Toggle mobile menu
  const toggleMobileMenu = (e) => {
    e.stopPropagation(); // Prevent triggering outside click handler
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navBar = (
    <>
      <li>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2 text-white")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to={'/my-InterviewFAQ'}
            className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2 text-white")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dev FAQ
          </NavLink>
        </li>
      )}
      {/* <li>
        <NavLink
          to={'/note'}
          className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2 text-white")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Note
        </NavLink>
      </li>
      <li>
        <NavLink
            to={'/code'}
            className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2 text-white")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Code
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/link'}
            className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2 text-white")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lists
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to={'/InterviewFAQs'}
            className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2 text-white")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            DevFAQs
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/about'}
            className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2 text-white")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/contact'}
            className={({ isActive }) => (isActive ? activeStyle : "px-3 py-2 text-white")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </NavLink>
        </li>
      </>
    );

  return (
    <div className="">
      <div className="navbar shadow-sm px-5 border-b-[1px] border-gray-700 bg-black">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          <Link to={"/"} className="text-xl font-bold text-[#C70039] md:text-white">
            DevDiary24
          </Link>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1 text-white">{navBar}</ul>
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
                      <span className="badge ">New</span>
                    </a>
                  </li>
                  <li>
                    <NavLink to={'/dashboard'} className="pl-2.5">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={logOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={"/Account/SignIn"}>
                <button className="bg-[#FB2C36]/90 hover:bg-[#FB2C36]/80 px-3 py-2 rounded-sm text-white">
                  Sign Up
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <p
              className="font-bold text-2xl cursor-pointer text-white"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <IoClose className='text-3xl'/> : <RiMenuLine />}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden fixed top-16 left-0 w-full bg-black z-50 flex flex-col items-center justify-center transition-transform duration-300 transform ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          ref={menuRef}
        >
          <ul className="flex flex-col w-full items-center gap-4 text-white py-4">
            {navBar}
            {user ? (
              <ul className="flex flex-col items-center gap-4 mt-4  border-t-[1px] border-white/80 pt-4">
                <li>
                  <a className="justify-between text-white">
                    Profile
                  </a>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard'}
                    className="pl-2.5 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <Link
                to={'/Account/SignIn'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <button className="bg-[#FB2C36]/90 hover:bg-[#FB2C36]/80 px-3 py-2 rounded-sm w-full mt-4 text-white">
                  Sign Up
                </button>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;