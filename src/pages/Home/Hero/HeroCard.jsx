import React from "react";

import heroTask from "../../../assets/heroTask.svg";
import timeManagement from "../../../assets/timeManagement.svg";

import { MdAccessTime } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import HeroCards from "../../../components/marquee/HeroCards";

const HeroCard = () => {
  return (
    <div>
      <div>
        <div className="flex lg:gap-48 items-center justify-center relative lg:top-10 ">


          {/* 1st card */}
          <div className="bg-white w-52 h-64 rounded-lg p-3 space-y-1  ">
              {/* img */}
              <img src={timeManagement} alt="" />
              {/* text */}
              <div className="flex justify-around items-center">
                <div>
                  <h2 className="text-black font-semibold">Time Management</h2>
                  <p className="text-gray-600">Efficient Task Control</p>
                </div>
                <div className="text-black text-2xl ">
                  <MdAccessTime />
                </div>
              </div>
            </div>


          {/* 2nd card */}
            <div className="bg-[#FFAE13] w-56 text-black h-72 rounded-lg p-3 space-y-1  absolute z-10  shadow-5xl shadow-black">

              <p className="bg-[#FF6B00] w-fit mx-auto px-2 text-center rounded-3xl">View Task</p>
              <h2 className="font-bold text-center">
                Add Your <br />
                Task/Assignment
              </h2>

              <img src={heroTask} alt="" />
            </div>

          {/* 3rd card */}
            <div className="bg-white w-52 h-64 rounded-lg p-3 space-y-1">
              {/* img */}
              <img src={timeManagement} alt="" />
              {/* text */}
              <div className="flex justify-around items-center">
                <div>
                  <h2 className="text-black font-semibold">Time Management</h2>
                  <p className="text-gray-600">Efficient Task Control</p>
                </div>
                <div className="text-black text-2xl ">
                  <MdAccessTime />
                </div>
              </div>
            </div>


        </div>
      </div>

    </div>
  );
};

export default HeroCard;
