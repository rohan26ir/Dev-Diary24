import React from 'react';
import { FaLinkedin, FaSquareFacebook, FaSquareGithub } from 'react-icons/fa6';
import { RiPassportFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <div>
      <div>

        <div className='flex flex-col md:flex-row justify-between items-center bg-gray-800 text-white p-5'>
          
          {/* section */}
          <div className=''>
            <img src="/public/diary.png" alt="" className='h-14 ' />
            <h2 className='text-xl font-bold'>Dev Diary24</h2>
          </div>
          {/* section */}
          <div className=''>

            <div>
              <h2 className='text-xl font-bold'>Contact</h2>
              <ul>
                <li>Phone: 01869396022</li>
                <li>Email: rohan26ir@gmail.com</li>
              </ul>
            </div>

          </div>
          {/* section */}
          <div className=''>
            <h2 className='text-xl font-bold'>Follow Me</h2>
            
  <div className='flex gap-2 text-4xl'>
   <a href=""> <FaSquareGithub /> </a>
   <a href=""> <FaLinkedin /> </a>
   <a href=""> <RiPassportFill /> </a>
   <a href=""> <FaSquareFacebook /> </a>
  </div>

          </div>


        </div>

      </div>
    </div>
  );
};

export default Footer;