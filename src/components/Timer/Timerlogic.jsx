import React, { useState, useEffect } from "react";
import TimerUI from "./TimerUI"; // This component handles displaying the timer UI
import StreakManager from "../NotIfacation/ToastNoti.jsx"; // Manages streak tracking
import { useAchievements } from "../../context/AchievementsContext"; // Custom hook to manage achievements
import AchievementTracker from "../Achievements/AchievementsTracker"; // Component to track achievements

const TimerLogic = () => {
  // State for the timer (grouped together)
  const [timerState, setTimerState] = useState({
    time: 0,          // Stores the current timer value (in seconds)
    isRunning: false, // Checks if the timer is running or stopped
    isStopwatch: false // true = stopwatch mode, false = countdown mode (i can switch any time)
  });

  // State for the user’s input time (grouped together)
  const [inputTime, setInputTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // State to track completed timers
  const [completedTimers, setCompletedTimers] = useState(0);

  // State to track timers completed within an hour
  const [timersInHour, setTimersInHour] = useState(0);

  // Custom hook to manage achievements
  const { achievements, unlockAchievement } = useAchievements();

  // Updates the timer state
  const updateTimerState = (updates) => {
    setTimerState((prev) => ({ ...prev, ...updates }));
  };

  // Updates the input time based on user input
  const updateInputTime = (field, value) => {
    setInputTime((prev) => ({ ...prev, [field]: value }));
  };

  // Controls the timer's countdown or stopwatch logic
  useEffect(() => {
    let intervalId;

    if (timerState.isRunning) {
      intervalId = setInterval(() => {
        setTimerState((prev) => {
          if (prev.isStopwatch) {
            // If it's a stopwatch, count UP
            return { ...prev, time: prev.time + 1 };
          } else {
            // If it's a countdown, count DOWN
            if (prev.time <= 1) {
              clearInterval(intervalId); // Stop at 0
              return { ...prev, time: 0, isRunning: false };
            }
            return { ...prev, time: prev.time - 1 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId); // Clean up when the timer stops
  }, [timerState.isRunning, timerState.isStopwatch]);

  // Track completed timers
  useEffect(() => {
    if (timerState.time === 0 && timerState.isRunning === false) {
      setCompletedTimers((prev) => prev + 1); // Increment completed timers

      // Track timers completed within an hour
      setTimersInHour((prev) => prev + 1);
      setTimeout(() => {
        setTimersInHour((prev) => prev - 1); // Reset after 1 hour
      }, 3600000); // 3600000 ms = 1 hour
    }
  }, [timerState.time, timerState.isRunning]);

  // Start or stop the timer
  const handleStartStop = () => {
    updateTimerState({ isRunning: !timerState.isRunning });
  };

  // Reset the timer
  const handleReset = () => {
    updateTimerState({ time: 0, isRunning: false });
  };

  // Switch between stopwatch & countdown mode
  const handleModeSwitch = () => {
    updateTimerState({ time: 0, isRunning: false, isStopwatch: !timerState.isStopwatch });
    setInputTime({ hours: 0, minutes: 0, seconds: 0 }); // Reset input fields
  };

  // Start countdown with user input
  const startCountdownTimer = () => {
    const totalSeconds = inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds;
    if (totalSeconds > 0) {
      updateTimerState({ time: totalSeconds, isRunning: true });
    }
  };

  // Format time from seconds → HH:MM:SS format
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {/* Tracks streaks based on usage */}
      <StreakManager isRunning={timerState.isRunning} time={timerState.time} isStopwatch={timerState.isStopwatch} />

      {/* Achievement Tracker */}
      <AchievementTracker
        timerState={timerState}
        completedTimers={completedTimers}
        timersInHour={timersInHour}
      />

      {/* Timer UI receives only necessary props */}
      <TimerUI
        timerState={timerState}
        inputTime={inputTime}
        formatTime={formatTime}
        handleStartStop={handleStartStop}
        handleReset={handleReset}
        handleModeSwitch={handleModeSwitch}
        startCountdownTimer={startCountdownTimer}
        updateInputTime={updateInputTime}
      />
    </div>
  );
};

export default TimerLogic;