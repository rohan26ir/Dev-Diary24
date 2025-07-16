import React from 'react';
import { FaLinkedin, FaSquareFacebook, FaSquareGithub } from 'react-icons/fa6';
import { RiPassportFill } from 'react-icons/ri';


import FooterImg from "../assets/diary.png"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className=''>
      <div className='w-11/12 container mx-auto'>

        <div className='flex flex-col md:flex-row justify-between items-center p-5'>
          
          {/* section */}
          <div className='w-[50%]  md:w-[100%] '>
            <img src={FooterImg} alt="" className='h-14 ' />
            <h2 className='text-xl font-bold'>DevDiary24</h2>
            <p className='text-gray-400 w-11/12 py-2'>Join our newsletter to stay up to date on features and releases.</p>
            <div className=''>
              <form action="">
                <input type="email" name="" id="" className='bg-white w-[50%] py-1 text-black px-2 mr-2 rounded-sm border-rose-500' />
              <button className='bg-[#FB2C36] px-3 py-1 text-white font-bold'>Subscribe</button>
              </form> 
            </div>
          </div>
          {/* section */}
          <div className='hidden md:block  w-[100%]'>

            <div className=''>
              <h2 className='text-xl font-bold'>Pages</h2>
              <ul className='mt-2 inline-flex flex-col gap-1'>
                <Link to={'/'}>
                  <li className='text-gray-400 hover:text-lime-400'>Home</li>
                </Link>
                <Link to={'/more-tools'}>
                  <li className='text-gray-400 hover:text-lime-400'>Feature</li>
                </Link>
                <Link to={'/about'}>
                  <li className='text-gray-400 hover:text-lime-400'>About Us</li>
                </Link>
                <Link to={'/contact'}>
                  <li className='text-gray-400 hover:text-lime-400'>Contact Us</li>
                </Link>
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
      
      <div className='flex justify-between w-11/12 mx-auto border-t-[1px] border-gray-800 text-center py-3 text-gray-500'>
        <div className=''>
          <p><p>© 2024 Webflow All right reserved.</p></p>
        </div>
        <div className=''>
          <ul className='flex gap-5'>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Footer;