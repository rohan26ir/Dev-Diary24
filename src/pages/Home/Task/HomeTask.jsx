import React, { useState, useEffect } from "react";

const HomeTask = () => {
  // Sample task data array
  const tasks = [
    {
      title: "Task 1",
      link: "http://example.com",
      description: "This is a description for task 1",
      company: "Company A",
      startDate: "2025-03-03T10:00:00",
      endDate: "2025-03-04T10:00:00",
    },
    {
      title: "Task 2",
      link: "http://example.com",
      description: "This is a description for task 2",
      company: "Company B",
      startDate: "2025-03-05T12:00:00",
      endDate: "2025-03-06T12:00:00",
    },
  ];

  // Countdown logic
  const calculateCountdown = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const difference = end - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [countdowns, setCountdowns] = useState(
    tasks.map((task) => calculateCountdown(task.endDate))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(tasks.map((task) => calculateCountdown(task.endDate)));
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="p-6">
      {/* Main container with tasks and countdown */}
      <div className="bg-gray-800 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Task List with Countdown</h2>

        {tasks.map((task, index) => (
          <div
            key={index}
            className="mb-6 p-6 bg-gray-700 rounded-md shadow-md flex flex-col md:flex-row justify-between items-center"
          >
            {/* Left Side: Task Info */}
            <div className="w-full md:w-3/5">
            
              {/* <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <a href={task.link} className="text-blue-400 hover:underline">
                  View More
                </a>
              </div> */}

              <p className="text-sm mb-2">
                <strong>Company:</strong> {task.company}
              </p>
              <p className="text-sm mb-2">
                <strong>Description:</strong> {task.description}
              </p>
              <p className="text-sm mb-2">
                <strong>Start:</strong> {new Date(task.startDate).toLocaleString()}
              </p>
              <p className="text-sm mb-4">
                <strong>End:</strong> {new Date(task.endDate).toLocaleString()}
              </p>

             
            </div>

            {/* Right Side: Countdown Timer */}
            <div className="flex gap-4 text-xl font-bold text-center bg-gray-600 p-4 rounded-md">
              <div className="flex flex-col p-2">
                <span className="text-3xl">{countdowns[index].days}</span>
                <span className="text-sm">Days</span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-3xl">{countdowns[index].hours}</span>
                <span className="text-sm">Hours</span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-3xl">{countdowns[index].minutes}</span>
                <span className="text-sm">Minutes</span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-3xl">{countdowns[index].seconds}</span>
                <span className="text-sm">Seconds</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTask;
