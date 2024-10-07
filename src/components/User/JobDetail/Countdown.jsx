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
    <div className="flex items-center gap-2">
      <h1 className="text-sm font-base">Time remaining:</h1>
      {!expired ? (
        <div className="text-third text-2xl flex items-end space-x-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-primary">{timeRemaining.days}</span>
            <span className="text-sm">Days</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm text-primary">{timeRemaining.hours}</span>
            <span className="text-sm">Hours</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm text-primary">
              {timeRemaining.minutes}
            </span>
            <span className="text-sm">Minutes</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm text-primary">
              {timeRemaining.seconds}
            </span>
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
