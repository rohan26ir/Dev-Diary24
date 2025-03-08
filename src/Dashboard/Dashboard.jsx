import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DashNav from "./Shared/DashNav";
import DashNavShort from "./Shared/DashNavShort";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

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
      <div className="w-full h-screen overflow-y-auto  ">
        {/* Toggle Button - Ensure it's positioned at the top-right */}
        <div className="hidden md:block">
        <div className="flex justify-end px-4 py-2 border-[1px] border-gray-600 ">
          <button
            className="bg-blue-500 text-white px-2 py-2 rounded hidden md:block"
            onClick={handleSideBar}
          >
            <BsLayoutTextSidebarReverse />
          </button>
        </div>
        </div>

        {/* Drawer for mobile sidebar */}
       <div className="block md:hidden ">
       <div className="flex justify-start px-4  py-3">
        <div className="drawer-content block md:hidden">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          <BsLayoutTextSidebarReverse />
          </label>
        </div>
        </div>
       </div>

        <div className="drawer z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />

          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <div className="flex justify-between pb-2">
                <div className="text-2xl font-bold">
                  <Link to={'/'}>Home</Link>
                </div>
                <div className=" text-3xl flex justify-center items-center rounded-sm">
                <label htmlFor="my-drawer" className=" text-rose-600 drawer-button">
                <IoMdCloseCircle />
              </label>
                </div>
              </div>
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
