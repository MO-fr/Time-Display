import React, { useEffect } from "react";
import { useAchievements } from "../../context/AchievementsContext";

const AchievementsTracker = ({ timerState, completedTimers, timersInHour }) => {
  const { achievements, unlockAchievement } = useAchievements();

  useEffect(() => {
    // First Timer Achievement
    if (completedTimers === 1) {
      unlockAchievement('firstTimer');
    }

    // 5 Timers Achievement
    if (completedTimers === 5) {
      unlockAchievement('fiveTimers');
    }

    // 10 Timers Achievement
    if (completedTimers === 10) {
      unlockAchievement('timerEnthusiast');
    }

    // 50 Timers Achievement
    if (completedTimers === 50) {
      unlockAchievement('proTimer');
    }

    // Speed Demon Achievement
    if (timersInHour >= 3) {
      unlockAchievement('speedDemon');
    }

    // Focus Master Achievement (25-minute timer completion)
    if (timerState.time === 0 && !timerState.isRunning && timerState.initialTime === 1500) {
      unlockAchievement('focusMaster');
    }

    // Long Timer Achievement
    if (timerState.time === 0 && !timerState.isRunning && timerState.initialTime >= 3600) {
      unlockAchievement('longTimer');
    }

    // Early Bird Achievement
    const currentHour = new Date().getHours();
    if (currentHour < 7 && timerState.isRunning) {
      unlockAchievement('earlyBird');
    }

    // Night Owl Achievement
    if (currentHour >= 0 && currentHour < 4 && timerState.isRunning) {
      unlockAchievement('nightOwl');
    }

  }, [timerState, completedTimers, timersInHour]);

  return null;
};

export default AchievementsTracker;