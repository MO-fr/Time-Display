import React, { useEffect, useRef } from "react";
import { useAchievements } from "../../context/AchievementsContext";
import { showAchievementToast } from "../NotIfacation/ToastNoti";

const AchievementsTracker = ({ timerState, completedTimers, timersInHour }) => {
  const { achievements, unlockAchievement } = useAchievements();
  const shownToasts = useRef(new Set());
  const prevCompletedTimers = useRef(completedTimers);

  // Separate useEffect for completion-based achievements
  useEffect(() => {
    // Check if this is a new completion
    if (completedTimers > prevCompletedTimers.current) {
      // First Timer Achievement
      if (completedTimers === 1) {
        unlockAchievement('firstTimer');
        showAchievementToast('firstTimer', 'First Timer', shownToasts);
      }

      // 5 Timers Achievement
      if (completedTimers === 5) {
        unlockAchievement('fiveTimers');
        showAchievementToast('fiveTimers', 'Triple Timer', shownToasts);
      }

      // 10 Timers Achievement
      if (completedTimers === 10) {
        unlockAchievement('timerEnthusiast');
        showAchievementToast('timerEnthusiast', 'Timer Enthusiast', shownToasts);
      }

      // 50 Timers Achievement
      if (completedTimers === 50) {
        unlockAchievement('proTimer');
        showAchievementToast('proTimer', 'Pro Timer', shownToasts);
      }

      // Focus Master Achievement (25-minute timer completion)
      if (timerState.initialTime === 1500) {
        unlockAchievement('focusMaster');
        showAchievementToast('focusMaster', 'Focus Master', shownToasts);
      }

      // Long Timer Achievement
      if (timerState.initialTime >= 3600) {
        unlockAchievement('longTimer');
        showAchievementToast('longTimer', 'Long Timer', shownToasts);
      }

      // Update the previous completedTimers count
      prevCompletedTimers.current = completedTimers;
    }
  }, [completedTimers, timerState.initialTime]);

  // Separate useEffect for time-based achievements
  useEffect(() => {
    // Speed Demon Achievement
    if (timersInHour >= 3 && !shownToasts.current.has('speedDemon')) {
      unlockAchievement('speedDemon');
      showAchievementToast('speedDemon', 'Speed Demon', shownToasts);
    }

    // Early Bird Achievement
    const currentHour = new Date().getHours();
    if (currentHour < 7 && timerState.isRunning && !shownToasts.current.has('earlyBird')) {
      unlockAchievement('earlyBird');
      showAchievementToast('earlyBird', 'Early Bird', shownToasts);
    }

    // Night Owl Achievement
    if (currentHour >= 0 && currentHour < 4 && timerState.isRunning && !shownToasts.current.has('nightOwl')) {
      unlockAchievement('nightOwl');
      showAchievementToast('nightOwl', 'Night Owl', shownToasts);
    }
  }, [timerState.isRunning, timersInHour]);

  return null;
};

export default AchievementsTracker;