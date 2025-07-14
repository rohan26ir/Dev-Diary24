import React from "react";

import heroTask from "../../../assets/heroTask.svg";
import timeManagement from "../../../assets/timeManagement.svg";

import { MdAccessTime } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import HeroCards from "../../../components/marquee/HeroCards";
import Lottie from "lottie-react";
import animationTimeManagement from '/public/Animation - time management.json';

const HeroCard = () => {
  return (
    <div>
      <div>
        <div className="flex lg:gap-48 items-center justify-center relative lg:top-10 ">


          {/* 1st card */}
          <div className="bg-white w-52 h-72 rounded-lg p-3 space-y-1  ">
              {/* img */}
              <img src={timeManagement} alt="" />
              {/* text */}
              <div className="flex justify-start items-end pt-3 ">
                <div>
                  <h2 className="text-black font-semibold">Beat the Clock</h2>
                  <p className="text-gray-600">Smart Time Control</p>
                </div>
              </div>
            </div>


          {/* 2nd card */}
            <div className="bg-lime-200 w-56 text-black h-72 pt-10 p-3 space-y-1  absolute z-10  shadow-2xl shadow-black">

              <div className="flex flex-col justify-end items-center text-center">
                 <h2 className="text-black font-semibold">Balance Your Work</h2>
                 <p className="text-gray-600">Effective Task Flow</p>
              </div>
              <Lottie 
              animationData={animationTimeManagement}  
              loop={true}
              className=""
              />
            </div>

          {/* 3rd card */}
            <div className="bg-white w-56 h-72 rounded-lg p-3 space-y-1">
              <img src={heroTask} alt="Plan and Execute" />
              <div className="flex justify-center items-end">
                <div>
                  <h2 className="text-black font-semibold">Add Your Task</h2>
                  <p className="text-gray-600">Plan and Execute</p>
                </div>
                {/* <div className="text-black text-2xl ">
                  <MdAccessTime />
                </div> */}
              </div>
            </div>


        </div>
      </div>

    </div>
  );
};

export default HeroCard;
