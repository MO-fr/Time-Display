import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner"; // ✅ Import Sonner's toast function
import TimerUI from "./TimerUI"; // ✅ Component for displaying the timer UI

const Timerlogic = () => {
  // ✅ State variables for timer behavior
  const [time, setTime] = useState(0); // Stores current time in seconds
  const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running
  const [isStopwatch, setIsStopwatch] = useState(true); // Tracks if in stopwatch (up) or timer (down) mode
  const [inputHours, setInputHours] = useState(0); // Stores user input hours
  const [inputMinutes, setInputMinutes] = useState(0); // Stores user input minutes
  const [inputSeconds, setInputSeconds] = useState(0); // Stores user input seconds
  const toastShown = useRef(false); // ✅ Ref to track if toast has been shown

  // ✅ useEffect hook runs when 'isRunning' or 'isStopwatch' changes
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (isStopwatch) {
            return prevTime + 1; // Stopwatch mode: count up
          } else {
            if (prevTime <= 1) {
              setIsRunning(false); // Stop the timer

              if (!toastShown.current) {
                toast.info("🔥 Time's up!"); // ✅ Show toast once
                toastShown.current = true; // ✅ Prevent duplicate toasts
              }

              return 0; // Ensure the timer stays at 0
            }
            return prevTime - 1; // Timer mode: count down
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId); // Cleanup function to stop the interval
  }, [isRunning, isStopwatch]);

  // ✅ Reset toast flag when timer restarts
  useEffect(() => {
    if (!isRunning) {
      toastShown.current = false; // ✅ Reset when timer stops
    }
  }, [isRunning]);

  // ✅ Function to format time into HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ Toggles timer start/stop
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // ✅ Resets timer to 0
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    toastShown.current = false; // ✅ Reset toast flag
  };

  // ✅ Switches between stopwatch and timer mode
  const handleModeSwitch = () => {
    setIsStopwatch(!isStopwatch);
    setTime(0);
    setIsRunning(false);
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
    toastShown.current = false; // ✅ Reset toast flag
  };

  // ✅ Starts countdown timer with user input
  const startCountdownTimer = () => {
    const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds; // Convert input into seconds
    if (totalSeconds > 0) {
      setTime(totalSeconds);
      setIsRunning(true);
      toastShown.current = false; // ✅ Reset toast flag
    }
  };

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
