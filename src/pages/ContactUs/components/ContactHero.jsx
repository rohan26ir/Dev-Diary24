import React from 'react';

const ContactHero = () => {
  return (
    <div className='bg-white/20 py-6'>
      {/* 1st section */}
      <div className='flex flex-col justify-center items-center md:max-w-3xl container mx-auto space-y-4'>
        <p>//Contact us</p>
        <h2 className='text-6xl font-bold'><span className='text-white/80'>Contact</span> Us</h2>
        <p className='text-center px-4'>Dev Diary24 helps you manage tasks, notes, deadlines, and tech FAQs with ease. For support, feedback, or questions — feel free to reach out to us anytime!</p>
      </div>
    </div>
  );
};

export default ContactHero;