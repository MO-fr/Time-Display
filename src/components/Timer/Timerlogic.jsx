import { useState, useEffect } from "react";
import TimerUI from "./TimerUI";
import { showTimerCompletionToast } from "../NotIfacation/TimerToast";
import AchievementTracker from "../Achievements/AchievementsTracker";
import { useAnalytics } from '../../hooks/useAnalytics';

const TimerLogic = () => {
  // State for the timer
  const [timerState, setTimerState] = useState({
    time: 0,          // Current timer value in seconds
    isRunning: false, // Running or stopped
    isStopwatch: false, // Stopwatch or countdown mode
    initialTime: 0    // Initial time for countdown mode
  });

  // State for user's input time
  const [inputTime, setInputTime] = useState({ 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });

  // Track timers completed within an hour
  const [timersInHour, setTimersInHour] = useState(0);

  // Get analytics functions and stats
  const { updateTimerUsage, timerStats } = useAnalytics();
  
  // Reset timers in hour count every hour
  useEffect(() => {
    const resetHourlyTimers = () => setTimersInHour(0);
    const now = new Date();
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
    const delay = nextHour - now;
    
    const timerId = setTimeout(resetHourlyTimers, delay);
    return () => clearTimeout(timerId);
  }, []);

  // Timer tick effect
  useEffect(() => {
    let intervalId;
    let timerCompleted = false;
    
    if (timerState.isRunning) {
      intervalId = setInterval(() => {
        setTimerState(prev => {
          if (prev.isStopwatch) {
            // For stopwatch, just increment time
            return { ...prev, time: prev.time + 1 };
          } else if (prev.time > 0) {
            // For countdown, decrement time
            return { ...prev, time: prev.time - 1 };
          } else {
            // Timer completed
            if (prev.initialTime > 0 && prev.isRunning && !timerCompleted) {
              timerCompleted = true;
              setTimersInHour(p => p + 1);
              updateTimerUsage(prev.initialTime, true);
              showTimerCompletionToast(prev.initialTime);
            }
            return { ...prev, isRunning: false };
          }
        });
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [timerState.isRunning, timerState.isStopwatch, updateTimerUsage]);

  // Handle start/stop
  const handleStartStop = () => {
    setTimerState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };  // Handle reset
  const handleReset = () => {
    // If timer was running and it's a stopwatch, record the time spent
    if (timerState.isStopwatch && timerState.isRunning && timerState.time > 0) {
      const timeToRecord = timerState.time;
      console.log('Stopwatch reset - recording time:', timeToRecord);
      
      // Update analytics directly, without setTimeout
      // The debouncing in the analytics context will prevent double updates
      updateTimerUsage(timeToRecord, false);
    }
    
    // Update timer state separately to avoid race conditions
    setTimerState(prev => ({
      ...prev,
      time: prev.isStopwatch ? 0 : prev.initialTime,
      isRunning: false
    }));
  };

  // Handle mode switch
  const handleModeSwitch = () => {
    setTimerState({
      time: 0,
      isRunning: false,
      isStopwatch: !timerState.isStopwatch,
      initialTime: 0
    });
    setInputTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  // Start countdown timer
  const startCountdownTimer = () => {
    const totalSeconds = (inputTime.hours * 3600) + (inputTime.minutes * 60) + inputTime.seconds;
    if (totalSeconds > 0) {
      setTimerState({
        time: totalSeconds,
        initialTime: totalSeconds,
        isRunning: true,
        isStopwatch: false
      });
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <div>
      <AchievementTracker
        timerState={timerState}
        completedTimers={timerStats.totalTimersCompleted}
        timersInHour={timersInHour}
        currentStreak={timerStats.currentStreak || 0}
      />

      <TimerUI
        timerState={timerState}
        inputTime={inputTime}
        formatTime={formatTime}
        handleStartStop={handleStartStop}
        handleReset={handleReset}
        handleModeSwitch={handleModeSwitch}
        startCountdownTimer={startCountdownTimer}
        updateInputTime={(field, value) => setInputTime(prev => ({ ...prev, [field]: value }))}
      />
    </div>
  );
};

export default TimerLogic;