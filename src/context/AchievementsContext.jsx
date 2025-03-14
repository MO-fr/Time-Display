import React, { createContext, useContext, useState } from "react";

// Create a context to share achievement data across components
const AchievementsContext = createContext();

// Custom hook to use the AchievementsContext easily
export const useAchievements = () => useContext(AchievementsContext);

// Provider component to wrap around the app and manage achievements
export const AchievementsProvider = ({ children }) => {
  // State to keep track of achievements and whether they are unlocked
  const [achievements, setAchievements] = useState({
    firstTimer: {
      id: 1,
      title: "First Timer",
      description: "Set your first timer",
      icon: "Clock",
      unlocked: false, // Starts as locked
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
  });

  // Function to unlock an achievement
  const unlockAchievement = (achievementId) => {
    if (!achievements[achievementId].unlocked) { // Check if it's already unlocked
      setAchievements((prev) => ({
        ...prev,
        [achievementId]: {
          ...prev[achievementId],
          unlocked: true, // Mark as unlocked once the achievement is done 
        },
      }));
      // Log a message when an achievement is unlocked
      console.log(`Achievement unlocked: ${achievements[achievementId].title}!`);
    }
  };

  return (
    // Provide achievements and unlock function to the entire app
    <AchievementsContext.Provider value={{ achievements, unlockAchievement }}>
      {children} {/* Render child components */}
    </AchievementsContext.Provider>
  );
};
