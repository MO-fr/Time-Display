import { createContext, useContext } from "react";

// Create a context to share achievement data across components
export const AchievementsContext = createContext();

// Custom hook to use the AchievementsContext easily
export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }
  return context;
};

// Initial achievements data
export const initialAchievements = {
  firstTimer: {
    id: 1,
    title: "First Timer",
    description: "Set your first timer",
    icon: "Clock",
    unlocked: false,
  },
  fiveTimers: {
    id: 2,
    title: "Triple Timer",
    description: "Complete 5 timers",
    icon: "Award",
    unlocked: false,
  },
  earlyBird: {
    id: 3,
    title: "Early Bird",
    description: "Set a timer before 7 AM",
    icon: "Star",
    unlocked: false,
  },
  focusMaster: {
    id: 4,
    title: "Focus Master",
    description: "Complete a 25-minute timer",
    icon: "Target",
    unlocked: false,
  },
  speedDemon: {
    id: 5,
    title: "Speed Demon",
    description: "Complete 3 timers in one hour",
    icon: "Zap",
    unlocked: false,
  },
  nightOwl: {
    id: 6,
    title: "Night Owl",
    description: "Use the app after midnight",
    icon: "Timer",
    unlocked: false,
  },
  consistency: {
    id: 7,
    title: "Consistency",
    description: "Use the timer 3 days in a row",
    icon: "Heart",
    unlocked: false,
  },
  longTimer: {
    id: 8,
    title: "Long Timer",
    description: "Set a timer longer than 1 hour",
    icon: "Medal",
    unlocked: false,
  },
  timerEnthusiast: {
    id: 9,
    title: "Timer Enthusiast",
    description: "Complete 10 timers",
    icon: "Trophy",
    unlocked: false,
  },
  proTimer: {
    id: 10,
    title: "Pro Timer",
    description: "Complete 50 timers",
    icon: "AlertTriangle",
    unlocked: false,
  },
};
