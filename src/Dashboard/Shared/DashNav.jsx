import React from "react";
import { NavLink } from "react-router-dom";

const DashNav = () => {
  const menuItems = [
    { name: "DevDairy24", path: "/" },
    { name: "Add Task", path: "/dashboard" },
    { name: "Theory", path: "/dashboard/theory" },
    { name: "PSol", path: "/dashboard/psol" },
    { name: "Note", path: "/dashboard/note" },
    { name: "Code", path: "/dashboard/code" },
    { name: "Link", path: "/dashboard/link" },
  ];

  const activeStyle = "bg-red-500 text-white px-3 py-2 rounded w-full block";
  const defaultStyle = "px-3 py-2 w-full block";

  return (
    <div className="bg-black min-h-screen px-5 shadow-2xl">
      <div className="pt-2">
        <ul className="space-y-1 w-full">
          {menuItems.map((item, index) => (
            <li key={index} className="w-full">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashNav;
