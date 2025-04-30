import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiHomeModern } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";

const DashNavShort = ({ handleSideBar }) => {
  const menuItems = [
    { path: "/dashboard/AddTask", icon: "➕", title: "Add Tasks" },
    { path: "/dashboard/AddInterviewFAQ", icon: "❓", title: "Add FAQ" },
    { path: "/dashboard/DashInterViewFAQs", icon: "📋", title: "All FAQs" },
    { path: "/dashboard/History", icon: "🕒", title: "History" },
  ];

  return (
    <div className="bg-gradient-to-b from-black to-black/20 text-white h-full pb-6 flex flex-col items-center">
      <div
        className=" h-10 w-full flex justify-center items-center cursor-pointer mb-5"
        onClick={handleSideBar}
      >
        <GiHamburgerMenu className="text-3xl"/>
      </div>
      <ul className="space-y-8">
        {menuItems.map((item, index) => (
          <li key={index} title={item.title}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `text-2xl p-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-blue-400 bg-gray-800 shadow-lg shadow-blue-500/20"
                    : "text-gray-400 hover:text-blue-300 hover:bg-gray-800"
                }`
              }
            >
              {item.icon}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashNavShort;