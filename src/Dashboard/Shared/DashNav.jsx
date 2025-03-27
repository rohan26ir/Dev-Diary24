import React from "react";
import { Link, NavLink } from "react-router-dom";

const DashNav = () => {
  const menuItems = [
    { name: "Add Task", path: "/dashboard/AddTask", icon: "➕" },
    { name: "Interview FAQ", path: "/dashboard/AddInterviewFAQ", icon: "❓" },
    { name: "All FAQs", path: "/dashboard/DashInterViewFAQs", icon: "📋" },
    { name: "History", path: "/dashboard/History", icon: "🕒" },
  ];

  return (
    <div className="bg-gradient-to-b from-black to-black/20 text-white h-full px-6 py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-rose-600">
          Dashboard
        </h2>
        <ul className="space-y-2">
          <Link to={'/'}><li className="text-xl font-bold mx-auto pb-2 border-b-[1px]">Home</li></Link>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#FB2C36] text-white "
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashNav;