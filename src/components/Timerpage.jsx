import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react'; // Importing icons for buttons

const Timerpage = () => {
  // State to track the time (in seconds)
  const [time, setTime] = useState(0);
  // State to check if the timer is running or paused
  const [isRunning, setIsRunning] = useState(false);

  // useEffect runs code when 'isRunning' changes
  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      // If the timer is running, increase time every second
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    // Cleanup function to stop the timer when the component unmounts or when 'isRunning' changes
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Function to format time in HH:MM:SS format
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600); // Get hours
    const mins = Math.floor((seconds % 3600) / 60); // Get minutes
    const secs = seconds % 60; // Get remaining seconds

    // Convert to string and ensure two digits (e.g., 01 instead of 1)
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to start or stop the timer
  const handleStartStop = () => {
    setIsRunning(!isRunning); // Toggle between running and paused
  };

  // Function to reset the timer to 0 and stop it
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="timer-container">
      <div className="timer-card">
        {/* Display the formatted time */}
        <div className="timer-display">
          {formatTime(time)}
        </div>
        
        {/* Buttons to control the timer */}
        <div className="timer-controls">
          {/* Play/Pause button */}
          <button onClick={handleStartStop} className="timer-button">
            {isRunning ? <Pause /> : <Play />} {/* Show pause icon if running, otherwise show play icon */}
          </button>
          
          {/* Reset button */}
          <button onClick={handleReset} className="timer-button">
            <RotateCcw /> {/* Reset icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timerpage;
