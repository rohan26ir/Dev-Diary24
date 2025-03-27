// Dashboard.jsx
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

import DashNav from "./Shared/DashNav";
import DashNavShort from "./Shared/DashNavShort";

const Dashboard = () => {
  const [isShortNav, setIsShortNav] = useState(false);

  const handleSideBar = () => {
    setIsShortNav((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block h-screen sticky top-0 transition-all duration-300 ${
          isShortNav ? "w-20" : "w-72"
        }`}
      >
        {isShortNav ? <DashNavShort /> : <DashNav />}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Toggle */}
        <div className="bg-black border-b sticky top-0 border-white/20 px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-[#C9232B] md:hidden">
            Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <button
              className="hidden md:block text-2xl p-2 hover:bg-gray-700 rounded-full transition-colors"
              onClick={handleSideBar}
            >
              <BsLayoutTextSidebarReverse />
            </button>
            <label
              htmlFor="my-drawer"
              className="md:hidden text-2xl p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <BsLayoutTextSidebarReverse />
            </label>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className="drawer md:hidden z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="bg-black w-72 min-h-full p-4">
              <div className="flex justify-between items-center mb-6">
                <Link to="/" className="text-2xl font-bold text-blue-400">
                  Dashboard
                </Link>
                <label
                  htmlFor="my-drawer"
                  className="text-3xl text-rose-500 hover:text-rose-400"
                >
                  <IoMdCloseCircle />
                </label>
              </div>
              <DashNav />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;