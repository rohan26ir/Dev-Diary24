import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiMenuLine } from 'react-icons/ri';
import { AuthContext } from '../Provider/Provider';

import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Define activeStyle for NavLink
  const activeStyle = 'bg-white/20 text-white px-3 py-2 rounded';

  // Close menu when clicking any NavLink
  const handleNavLinkClick = () => setIsMenuOpen(false);

  const navBar = (
    <>
      <li>
        <NavLink
          to={'/'}
          className={({ isActive }) => (isActive ? activeStyle : 'px-3 py-2')}
          onClick={handleNavLinkClick}
        >
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <details className="">
            <summary className="px-3 py-2 cursor-pointer">My Pocket</summary>
            <ul className="p-2 text-white bg-black/80 z-30">
              <li>
                <NavLink
                  to={'/my-InterviewFAQ'}
                  className={({ isActive }) =>
                    isActive ? activeStyle : 'px-3 py-2'
                  }
                  onClick={handleNavLinkClick}
                >
                  Dev FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/interview/InterParsonal'}
                  className={({ isActive }) =>
                    isActive ? activeStyle : 'px-3 py-2'
                  }
                  onClick={handleNavLinkClick}
                >
                  InterPer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/interview/theory'}
                  className={({ isActive }) =>
                    isActive ? activeStyle : 'px-3 py-2'
                  }
                  onClick={handleNavLinkClick}
                >
                  Theory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/interview/problem-solving'}
                  className={({ isActive }) =>
                    isActive ? activeStyle : 'px-3 py-2'
                  }
                  onClick={handleNavLinkClick}
                >
                  PSol
                </NavLink>
              </li>
            </ul>
          </details>
        </li>
      )}
      <li>
        <NavLink
          to={'/note'}
          className={({ isActive }) => (isActive ? activeStyle : 'px-3 py-2')}
          onClick={handleNavLinkClick}
        >
          Note
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/code'}
          className={({ isActive }) => (isActive ? activeStyle : 'px-3 py-2')}
          onClick={handleNavLinkClick}
        >
          Code
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/link'}
          className={({ isActive }) => (isActive ? activeStyle : 'px-3 py-2')}
          onClick={handleNavLinkClick}
        >
          Lists
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/InterviewFAQs'}
          className={({ isActive }) => (isActive ? activeStyle : 'px-3 py-2')}
          onClick={handleNavLinkClick}
        >
          DevFAQs
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar shadow-sm px-5 border-b-[1px] border-gray-700">
        <div className="navbar-start flex gap-2 justify-between">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="font-bold text-2xl text-white"
            >
              <RiMenuLine />
            </button>
          </div>

          {/* Logo for Mobile */}
          <div className="block md:hidden">
            <Link to={'/'} className="text-xl text-[#C70039] font-bold">
              DevDiary
            </Link>
          </div>

          {/* Logo for Desktop */}
          <div className="hidden md:block">
            <Link
              to={'/'}
              title="DevDiary"
              className="text-xl text-white font-bold"
            >
              DevDiary24
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden md:block lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{navBar}</ul>
        </div>

        {/* Profile Section */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
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
            <div>
              <Link to={'/Account/SignIn'}>
                <button className="bg-[#FB2C36]/90 hover:bg-[#FB2C36]/80 px-3 py-2 rounded-sm cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)} // Close on overlay click
          >
            <div
              ref={menuRef}
              className="fixed top-0 left-0 w-full bg-black/95 text-white z-50 transition-all duration-300 ease-in-out max-h-screen opacity-100"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
                
                <button
                  onClick={toggleMenu}
                  className=" text-3xl rounded-3xl"
                  aria-label="Close menu"
                >
                  <IoClose />
                </button>

                <Link to={'/'} onClick={handleNavLinkClick}>
                  <h2 className="text-2xl text-[#C70039] font-bold">DevDiary24</h2>
                </Link>
              </div>
              <ul className="flex flex-col items-center gap-4 p-4 text-lg">
                {navBar}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;