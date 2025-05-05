import React from "react";
import { Link, NavLink } from "react-router-dom";

const DashNav = ({ handleSideBar }) => {
  const addNew = [
    { name: "Add Task", path: "/dashboard/AddTask" },
    { name: "Interview FAQ", path: "/dashboard/AddInterviewFAQ" },
  ];

  const menuItems = [
    { name: "Add Task", path: "/dashboard/AddTask", icon: "➕" },
    { name: "Interview FAQ", path: "/dashboard/AddInterviewFAQ", icon: "❓" },
    { name: "All FAQs", path: "/dashboard/DashInterViewFAQs", icon: "📋" },
    { name: "History", path: "/dashboard/History", icon: "🕒" },
  ];

  return (
    <div className="bg-gradient-to-b from-black to-black text-white h-full pb-8 shadow-2xl border-[1px] border-white/20 flex flex-col items-center">
      <div
        className="border-b-[1px] border-white/20 h-10 w-full flex justify-center items-center cursor-pointer text-2xl font-bold gap-2 mb-5"
        onClick={handleSideBar}
      >
        Dashboard
      </div>
      <div className="space-y-2">
        <Link to={"/dashboard"}><p className="m-4 text-xl font-bold">Account Panel</p></Link>
        <ul className="space-y-2  border-t-[1px] border-white/30">
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