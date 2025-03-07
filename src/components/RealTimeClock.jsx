import React, { useState, useEffect } from "react";
import moment from "moment";

const RealTimeClock = () => {
  const [time, setTime] = useState(moment().format("h:mm:ss a"));

  useEffect(() => {
    
    const interval = setInterval(() => {
      setTime(moment().format("h:mm:ss a"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    {time}
    </div>
  );
};

export default RealTimeClock;
