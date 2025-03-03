import React, { useState, useEffect } from "react";
import TimerUI from "./TimerUI"; // ✅ This component handles displaying the timer UI
import StreakManager from "./StreakManager.jsx"; // ✅ Import the new StreakManager component

const Timerlogic = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStopwatch, setIsStopwatch] = useState(true);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (isStopwatch) {
            return prevTime + 1;
          } else {
            if (prevTime <= 1) {
              setIsRunning(false);
              return 0;
            }
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isStopwatch]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleModeSwitch = () => {
    setIsStopwatch(!isStopwatch);
    setTime(0);
    setIsRunning(false);
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  const startCountdownTimer = () => {
    const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    if (totalSeconds > 0) {
      setTime(totalSeconds);
      setIsRunning(true);
    }
  };

  return (
    <div>
      <StreakManager isRunning={isRunning} time={time} isStopwatch={isStopwatch} />
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
    </div>
  );
};

export default Timerlogic;