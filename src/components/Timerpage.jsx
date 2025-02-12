import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Clock } from 'lucide-react';

const TimerPage = () => {
  // State variables (like memory boxes to store data)
  const [time, setTime] = useState(0); // Stores the current time in seconds
  const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running
  const [isStopwatch, setIsStopwatch] = useState(true); // Tracks if it's in stopwatch or timer mode
  const [inputHours, setInputHours] = useState(0); // Stores hours input by the user
  const [inputMinutes, setInputMinutes] = useState(0); // Stores minutes input by the user
  const [inputSeconds, setInputSeconds] = useState(0); // Stores seconds input by the user

  // This runs every second when the timer is running
  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          if (isStopwatch) {
            return prevTime + 1; // If it's a stopwatch, count up by 1 second
          } else {
            if (prevTime <= 0) {
              setIsRunning(false); // If time reaches 0, stop the timer
              return 0;
            }
            return prevTime - 1; // If it's a timer, count down by 1 second
          }
        });
      }, 1000); // Update every 1 second (1000 milliseconds)
    }
    
    return () => clearInterval(intervalId); // Cleanup when the component is removed
  }, [isRunning, isStopwatch]);

  // Format time into HH:MM:SS (e.g., 01:23:45)
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600); // Calculate hours
    const mins = Math.floor((seconds % 3600) / 60); // Calculate minutes
    const secs = seconds % 60; // Calculate seconds
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start or stop the timer
  const handleStartStop = () => {
    setIsRunning(!isRunning); // Toggle between running and paused
  };

  // Reset the timer
  const handleReset = () => {
    setTime(0); // Reset time to 0
    setIsRunning(false); // Stop the timer
  };

  // Switch between Stopwatch and Timer modes
  const handleModeSwitch = () => {
    setIsStopwatch(!isStopwatch); // Toggle between stopwatch and timer
    setTime(0); // Reset time to 0
    setIsRunning(false); // Stop the timer
    setInputHours(0); // Reset hours input
    setInputMinutes(0); // Reset minutes input
    setInputSeconds(0); // Reset seconds input
  };

  // Start the countdown timer with the input values
  const startCountdownTimer = () => {
    const totalSeconds = (inputHours * 3600) + (inputMinutes * 60) + inputSeconds; // Convert hours, minutes, seconds to total seconds
    if (totalSeconds > 0) {
      setTime(totalSeconds); // Set the timer to the total seconds
      setIsRunning(true); // Start the timer
    }
  };

  return (
    <div className="timer-card">
      {/* Switch between Stopwatch and Timer */}
      <div className="flex items-center gap-2 mb-4">
        <button 
          onClick={handleModeSwitch}
          className="mode-switch-button"
        >
          {isStopwatch ? <Timer className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          Switch to {isStopwatch ? 'Timer' : 'Stopwatch'}
        </button>
      </div>

      {/* Display the current time */}
      <div className="timer-display">
        {formatTime(time)}
      </div>

      {/* Input fields for hours, minutes, and seconds (only shown in Timer mode) */}
      {!isStopwatch && (
        <div className="timer-input-container">
          <input
            type="number"
            min="0"
            value={inputHours}
            onChange={(e) => setInputHours(parseInt(e.target.value) || 0)} // Update hours input
            className="timer-input"
            placeholder="HH"
          />
          <span className="timer-separator">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(parseInt(e.target.value) || 0)} // Update minutes input
            className="timer-input"
            placeholder="MM"
          />
          <span className="timer-separator">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(parseInt(e.target.value) || 0)} // Update seconds input
            className="timer-input"
            placeholder="SS"
          />
        </div>
      )}

      {/* Buttons to control the timer */}
      <div className="timer-controls">
        {isStopwatch || time > 0 ? (
          <button
            onClick={handleStartStop}
            className="timer-button"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
        ) : (
          <button
            onClick={startCountdownTimer}
            className="timer-button"
          >
            Start Timer
          </button>
        )}
        
        <button
          onClick={handleReset}
          className="timer-button"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TimerPage;