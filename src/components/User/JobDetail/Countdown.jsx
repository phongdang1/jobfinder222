import React, { useState, useEffect } from "react";

const Countdown = ({ endTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeLeft = calculateTimeRemaining();
      setTimeRemaining(timeLeft);
      if (timeLeft.total <= 0) {
        setExpired(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-2">Time remaining:</h1>
      {!expired ? (
        <div className="text-primary text-2xl flex items-end space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{timeRemaining.days}</span>
            <span className="text-sm">Days</span>
          </div>
          <span>|</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{timeRemaining.hours}</span>
            <span className="text-sm">Hours</span>
          </div>
          <span>|</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{timeRemaining.minutes}</span>
            <span className="text-sm">Minutes</span>
          </div>
          <span>|</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{timeRemaining.seconds}</span>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
      ) : (
        <div className="text-black text-lg font-bold">
          Time to apply has expired!
        </div>
      )}
    </div>
  );
};

export default Countdown;
