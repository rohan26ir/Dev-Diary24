import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashNav from "./Shared/DashNav";
import DashNavShort from "./Shared/DashNavShort";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const Dashboard = () => {
  const [isShortNav, setIsShortNav] = useState(false);

  const handleSideBar = () => {
    setIsShortNav((prev) => !prev);
  };

  return (
    <div className="h-screen flex bg-black text-white">
      
      {/* Sidebar */}
      <div
        className={`h-screen overflow-y-auto transition-all duration-300 ${
          isShortNav ? "w-[5%]" : "w-[20%]"
        } md:block hidden`}
      >
        {!isShortNav ? <DashNav />  : <DashNavShort></DashNavShort>}
      </div>

      {/* Main content area with independent scrolling */}
      <div className="w-full h-screen overflow-y-auto">
        {/* Toggle Button - Ensure it's positioned at the top-right */}
        <div className="flex justify-end px-4 py-1 border-[1px] border-gray-600">
          <button
            className="bg-blue-500 text-white px-2 py-2 rounded hidden md:block"
            onClick={handleSideBar}
          >
            <BsLayoutTextSidebarReverse />
          </button>
        </div>

        {/* Drawer for mobile sidebar */}
        <div className="drawer-content block md:hidden">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
        </div>

        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />

          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/10">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
