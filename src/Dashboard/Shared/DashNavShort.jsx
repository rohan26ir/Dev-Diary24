import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiHomeModern } from "react-icons/hi2";

const DashNavShort = () => {
  const menuItems = [
    { path: "/dashboard/AddTask", icon: "➕", title: "Add Tasks" },
    { path: "/dashboard/AddInterviewFAQ", icon: "❓", title: "Add FAQ" },
    { path: "/dashboard/DashInterViewFAQs", icon: "📋", title: "All FAQs" },
    { path: "/dashboard/History", icon: "🕒", title: "History" },
  ];

  return (
    <div className="bg-gradient-to-b from-black to-black/20 text-white h-full py-6 flex flex-col items-center">
      {/* <Link to="/" className="mb-8">
        <HiHomeModern className="text-3xl text-blue-400 hover:text-blue-300 transition-colors" />
      </Link> */}
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