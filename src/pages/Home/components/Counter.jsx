import React, { useEffect, useState } from 'react';
import { FaRegStickyNote, FaCheckCircle, FaHourglassHalf, FaQuestionCircle, FaUsers, FaPlusCircle } from "react-icons/fa";
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Initialize Swiper modules if needed (e.g., Navigation, Pagination)
SwiperCore.use([]);

const Counter = () => {
  const countCard = [
    { id: 1, count: 120, icon: <FaRegStickyNote />, title: 'Daily Notes' },
    { id: 2, count: 95, icon: <FaCheckCircle />, title: 'Task Management' },
    { id: 3, count: 56, icon: <FaHourglassHalf />, title: 'Deadline Tracker' },
    { id: 4, count: 60, icon: <FaQuestionCircle />, title: 'FAQ Storage' },
    { id: 5, count: 124, icon: <FaUsers />, title: 'Users' },
    { id: 6, count: 9, icon: <FaPlusCircle />, title: 'Add Features' }, 
  ];

  // State to manage animated counts
  const [counts, setCounts] = useState(countCard.map(() => 0));

  // Countdown animation effect
  useEffect(() => {
    const duration = 5000; // 5 seconds
    const increments = countCard.map(card => card.count / (duration / 50)); // Update every 50ms

    const interval = setInterval(() => {
      setCounts(prevCounts => {
        return prevCounts.map((count, index) => {
          if (count < countCard[index].count) {
            return Math.min(count + increments[index], countCard[index].count);
          }
          return count;
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-white/10 py-6'>
      <div className='w-11/12 mx-auto'>
        <Swiper
          spaceBetween={16}
          slidesPerView={1} // Default for mobile
          breakpoints={{
            640: { slidesPerView: 2 }, // sm: 2 slides
            768: { slidesPerView: 3 }, // md: 3 slides
            1024: { slidesPerView: 4 }, // lg: 4 slides
          }}
          className='mySwiper'
        >
          {countCard.map((card, index) => (
            <SwiperSlide key={card.id}>
              <div
                className='bg-black min-w-[200px] sm:min-w-[220px] h-36 shadow-xl rounded-lg p-5 flex gap-2 items-center justify-center  cursor-grab'
              >
                <div className='text-3xl text-[#C70039]'>{card.icon}</div>
                <div className='flex flex-col items-center justify-center'>
                  <h2 className='text-2xl font-bold text-white'>
                    {Math.floor(counts[index])}
                  </h2>
                  <p className='text-gray-400 text-sm text-center'>{card.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Counter;