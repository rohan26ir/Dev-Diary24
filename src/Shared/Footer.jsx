import React from 'react';
import { FaLinkedin, FaSquareFacebook, FaSquareGithub } from 'react-icons/fa6';
import { RiPassportFill } from 'react-icons/ri';


import FooterImg from "../assets/diary.png"

const Footer = () => {
  return (
    <div className='border-t-[1px] border-gray-800'>
      <div className='w-11/12 container mx-auto'>

        <div className='flex flex-col md:flex-row justify-between items-center p-5'>
          
          {/* section */}
          <div className='w-[50%]  md:w-[100%]'>
            <img src={FooterImg} alt="" className='h-14 ' />
            <h2 className='text-xl font-bold'>Dev Diary24</h2>
          </div>
          {/* section */}
          <div className='hidden md:block  w-[100%]'>

            <div className=''>
              <h2 className='text-xl font-bold'>Contact</h2>
              <ul>
                <li>Phone: 01869396022</li>
                <li>Email: rohan26ir@gmail.com</li>
              </ul>
            </div>

          </div>
          {/* section */}
          <div className=''>

            <div>
            
            <div className='hidden md:block'>
            <h2 className='text-xl font-bold'>Follow Me</h2>
            </div>
            
            <div className='flex gap-2 text-4xl'>
             <a href="https://github.com/rohan26ir"> <FaSquareGithub /> </a>
             <a href="https://www.linkedin.com/in/rohan26ir/"> <FaLinkedin /> </a>
             <a href="https://rohansfolio.web.app/"> <RiPassportFill /> </a>
             <a href="https://www.facebook.com/mahedul23"> <FaSquareFacebook /> </a>
            </div>
          
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};

export default Footer;