import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im';
import { TbSocial } from 'react-icons/tb';

const ContactCards = () => {
  const contactCards = [
    { id: 1, icon: <MdOutlineEmail />, title: 'Email Address', description: 'diary24@gmail.com' },
    { id: 2, icon: <FaPhoneAlt />, title: 'Phone Number', description: '+1 234 567 890' },
    { id: 3, icon: <TbSocial />, title: 'Social Media', description: '@devdiary24' },
    { id: 4, icon: <ImLocation2 />, title: 'Our Location', description: 'Dhaka, Bangladesh' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactCards.map((card) => (
          <div
            key={card.id}
            className="border-2 border-white/15 rounded-lg shadow-lg p-4 bg-gray-800/50 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-black h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-[#C70039] text-xl sm:text-2xl">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg">{card.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCards;