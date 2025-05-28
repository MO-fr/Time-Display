import { useState, useEffect } from "react";
import TimerUI from "./TimerUI";
import StreakManager from "../NotIfacation/ToastNoti.jsx";
import AchievementTracker from "../Achievements/AchievementsTracker";
import { useAnalytics } from '../../hooks/useAnalytics';

const TimerLogic = () => {
  // State for the timer (grouped together)
  const [timerState, setTimerState] = useState({
    time: 0,          // Stores the current timer value (in seconds)
    isRunning: false, // Checks if the timer is running or stopped
    isStopwatch: false, // true = stopwatch mode, false = countdown mode
    initialTime: 0    // Stores the initial time for countdown mode
  });

  // State for the user's input time (grouped together)
  const [inputTime, setInputTime] = useState({ 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });

  // State to track timers completed within an hour
  const [timersInHour, setTimersInHour] = useState(0);
  
  // Reference to track previous running state
  const [previouslyRunning, setPreviouslyRunning] = useState(false);

  // Hook to track analytics
  const { updateTimerUsage, timerStats } = useAnalytics();

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
      setPreviouslyRunning(true);
      intervalId = setInterval(() => {
        setTimerState((prev) => {
          if (prev.isStopwatch) {
            // If it's a stopwatch, count UP
            return { ...prev, time: prev.time + 1 };
          } else {
            // If it's a countdown, count DOWN
            if (prev.time <= 1) {
              clearInterval(intervalId); // Stop at 0
              // Record timer completion
              const duration = prev.initialTime;
              updateTimerUsage(duration, true);
              setTimersInHour(prevCount => prevCount + 1);
              return { ...prev, time: 0, isRunning: false };
            }
            return { ...prev, time: prev.time - 1 };
          }
        });
      }, 1000);
    } else if (previouslyRunning) {
      // Timer was running but is now stopped
      setPreviouslyRunning(false);
      
      // Handle stopwatch completion
      if (timerState.isStopwatch && timerState.time > 0) {
        updateTimerUsage(timerState.time, true);
        setTimersInHour(prev => prev + 1);
      }
    }

    return () => clearInterval(intervalId); // Clean up when the timer stops
  }, [timerState.isRunning, timerState.isStopwatch, timerState.time, timerState.initialTime, previouslyRunning, updateTimerUsage]);

  // Manage hourly timer tracking
  useEffect(() => {
    const cleanupTimeouts = [];
    
    // When a timer is completed, schedule its removal from hourly count
    if (timersInHour > 0) {
      const timeoutId = setTimeout(() => {
        setTimersInHour(prev => Math.max(0, prev - 1));
      }, 3600000); // 1 hour
      cleanupTimeouts.push(timeoutId);
    }

    // Cleanup function to clear all timeouts
    return () => {
      cleanupTimeouts.forEach(clearTimeout);
    };
  }, [timersInHour]);

  // Start or stop the timer
  const handleStartStop = () => {
    if (!timerState.isRunning) {
      updateTimerUsage(); // Track timer usage when starting
    }
    updateTimerState({ isRunning: !timerState.isRunning });
  };

  // Reset the timer
  const handleReset = () => {
    updateTimerState({ time: 0, isRunning: false });
  };

  // Switch between stopwatch & countdown mode
  const handleModeSwitch = () => {
    updateTimerState({ 
      time: 0, 
      isRunning: false, 
      isStopwatch: !timerState.isStopwatch,
      initialTime: 0
    });
    setInputTime({ hours: 0, minutes: 0, seconds: 0 }); // Reset input fields
  };

  // Start countdown with user input
  const startCountdownTimer = () => {
    const totalSeconds = inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds;
    if (totalSeconds > 0) {
      updateTimerUsage(); // Track timer usage when starting a countdown
      updateTimerState({ 
        time: totalSeconds, 
        initialTime: totalSeconds,
        isRunning: true 
      });
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
      <StreakManager 
        isRunning={timerState.isRunning} 
        time={timerState.time} 
        isStopwatch={timerState.isStopwatch} 
      />

      {/* Achievement Tracker */}
      <AchievementTracker
        timerState={timerState}
        completedTimers={timerStats.totalTimersCompleted}
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
