import React from 'react';
import { HiHomeModern } from "react-icons/hi2";
import { MdAddLink, MdAssignmentAdd, MdFormatListBulletedAdd, MdOndemandVideo, MdOutlineContactMail, MdOutlineDesignServices } from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import { GrContactInfo } from "react-icons/gr";
import { FaNotesMedical } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';

const DashNavShort = () => {
  const menuItems = [
    { path: "/dashboard", icon: <MdAssignmentAdd />, title: "Add Tasks" },
    { path: "/dashboard", icon: <MdAddLink />, title: "Add Link" },
    { path: "/dashboard", icon: <GrContactInfo />, title: "Contact Info" },
    { path: "/dashboard", icon: <MdOutlineDesignServices />, title: "Design Services" },
    { path: "/dashboard", icon: <MdOutlineContactMail />, title: "Contact Mail" },
    { path: "/dashboard", icon: <FaUniversity />, title: "University" },
    { path: "/dashboard", icon: <MdOndemandVideo />, title: "Videos" },
    { path: "/dashboard", icon: <FaNotesMedical />, title: "Medical Notes" },
    { path: "/dashboard", icon: <MdFormatListBulletedAdd />, title: "Task List" }
  ];

  const activeStyle = "text-red-500";

  return (
    <div className='bg-black min-h-screen px-1'>
      <div>
        <div className='flex justify-center items-center py-5'>
          <Link to={"/"}><h2 className='text-2xl'><HiHomeModern /></h2></Link>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <ul className='space-y-5 text-3xl'>
            {menuItems.map((item, index) => (
              <li key={index} title={item.title}>
                <NavLink to={item.path} className={({ isActive }) => (isActive ? activeStyle : "")}>
                  {item.icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashNavShort;
