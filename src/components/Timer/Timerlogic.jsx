import React, { useState, useEffect } from 'react';
import TimerUI from './TimerUI'; // This is the part that shows the timer on the screen

//This code deals with the logic of the timer
  
const Timerlogic = () => {
  // These are like memory boxes to store information
  const [time, setTime] = useState(0); // Stores the current time in seconds
  const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running or paused
  const [isStopwatch, setIsStopwatch] = useState(true); // Tracks if it's a stopwatch (counting up) or a timer (counting down)
  const [inputHours, setInputHours] = useState(0); // Stores the hours the user types in
  const [inputMinutes, setInputMinutes] = useState(0); // Stores the minutes the user types in
  const [inputSeconds, setInputSeconds] = useState(0); // Stores the seconds the user types in

  // This runs every second when the timer is running
  useEffect(() => {
    let intervalId; // This is like a clock ticking every second

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (isStopwatch) {
            return prevTime + 1; // If it's a stopwatch, add 1 second
          } else {
            if (prevTime <= 0) {
              setIsRunning(false); // If the timer hits 0, stop it
              return 0;
            }
            return prevTime - 1; // If it's a timer, subtract 1 second
          }
        });
      }, 1000); // Wait 1000 milliseconds (1 second) before running again
    }

    // Cleanup: Stop the clock when the timer is turned off
    return () => clearInterval(intervalId);
  }, [isRunning, isStopwatch]); // Only run this when isRunning or isStopwatch changes

  // This turns the total seconds into a nice-looking time format (HH:MM:SS)
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600); // Calculate hours
    const mins = Math.floor((seconds % 3600) / 60); // Calculate minutes
    const secs = seconds % 60; // Calculate seconds
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // This starts or stops the timer when you press the button
  const handleStartStop = () => {
    setIsRunning(!isRunning); // Toggle between running and paused
  };

  // This resets the timer to 0
  const handleReset = () => {
    setTime(0); // Set time back to 0
    setIsRunning(false); // Stop the timer
  };

  // This switches between stopwatch and timer mode
  const handleModeSwitch = () => {
    setIsStopwatch(!isStopwatch); // Toggle between stopwatch and timer
    setTime(0); // Reset time to 0
    setIsRunning(false); // Stop the timer
    setInputHours(0); // Reset hours input
    setInputMinutes(0); // Reset minutes input
    setInputSeconds(0); // Reset seconds input
  };

  // This starts the countdown timer with the time the user typed in
  const startCountdownTimer = () => {
    const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds; // Convert hours, minutes, and seconds into total seconds
    if (totalSeconds > 0) {
      setTime(totalSeconds); // Set the timer to the total seconds
      setIsRunning(true); // Start the timer
    }
  };

  // This sends all the information and functions to the TimerUI component to display on the screen
  return (
    <TimerUI
      time={time}
      isRunning={isRunning}
      isStopwatch={isStopwatch}
      inputHours={inputHours}
      inputMinutes={inputMinutes}
      inputSeconds={inputSeconds}
      formatTime={formatTime}
      handleStartStop={handleStartStop}
      handleReset={handleReset}
      handleModeSwitch={handleModeSwitch}
      startCountdownTimer={startCountdownTimer}
      setInputHours={setInputHours}
      setInputMinutes={setInputMinutes}
      setInputSeconds={setInputSeconds}
    />
  );
};

export default Timerlogic;