import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useEffect, useRef } from "react";
import { useAchievements } from "../../context/AchievementsContext";
import { showAchievementToast } from "../NotIfacation/ToastNoti";

const AchievementsTracker = ({ timerState, completedTimers, timersInHour }) => {
  const { unlockAchievement } = useAchievements();
  const shownToasts = useRef(new Set());
  const prevCompletedTimers = useRef(completedTimers);
  const achievementsConfig = useRef({
    firstTimer: { count: 1, message: "First Timer" },
    fiveTimers: { count: 5, message: "Triple Timer" },
    timerEnthusiast: { count: 10, message: "Timer Enthusiast" },
    proTimer: { count: 50, message: "Pro Timer" },
    focusMaster: { time: 1500, message: "Focus Master" },
    longTimer: { time: 3600, message: "Long Timer" },
    speedDemon: { count: 3, message: "Speed Demon" },
    earlyBird: { hour: 7, message: "Early Bird" },
    nightOwl: { hour: 4, message: "Night Owl" },
  });

  useEffect(() => {
    if (completedTimers > prevCompletedTimers.current) {
      Object.keys(achievementsConfig.current).forEach((achievement) => {
        const config = achievementsConfig.current[achievement];
        if (config.count && completedTimers === config.count) {
          unlockAchievement(achievement);
          showAchievementToast(achievement, config.message, shownToasts);
        }
        if (config.time && timerState.initialTime === config.time) {
          unlockAchievement(achievement);
          showAchievementToast(achievement, config.message, shownToasts);
        }
      });
      prevCompletedTimers.current = completedTimers;
    }
  }, [completedTimers, timerState.initialTime, unlockAchievement]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (timersInHour >= achievementsConfig.current.speedDemon.count && !shownToasts.current.has("speedDemon")) {
      unlockAchievement("speedDemon");
      showAchievementToast("speedDemon", achievementsConfig.current.speedDemon.message, shownToasts);
    }
    if (currentHour < achievementsConfig.current.earlyBird.hour && timerState.isRunning && !shownToasts.current.has("earlyBird")) {
      unlockAchievement("earlyBird");
      showAchievementToast("earlyBird", achievementsConfig.current.earlyBird.message, shownToasts);
    }
    if (
      currentHour >= 0 &&
      currentHour < achievementsConfig.current.nightOwl.hour &&
      timerState.isRunning &&
      !shownToasts.current.has("nightOwl")
    ) {
      unlockAchievement("nightOwl");
      showAchievementToast("nightOwl", achievementsConfig.current.nightOwl.message, shownToasts);
    }
  }, [timerState.isRunning, timersInHour, unlockAchievement]);

  return null;
};

// Add PropTypes for prop validation
AchievementsTracker.propTypes = {
  timerState: PropTypes.shape({
    isRunning: PropTypes.bool.isRequired,
    initialTime: PropTypes.number.isRequired,
  }).isRequired,
  completedTimers: PropTypes.number.isRequired,
  timersInHour: PropTypes.number.isRequired,
};

export default AchievementsTracker;