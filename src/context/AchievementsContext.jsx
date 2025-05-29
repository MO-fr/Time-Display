import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { AchievementsContext, initialAchievements } from "../utils/achievementsUtils";
import { useAchievementNotifications } from "../components/NotIfacation/AchievementNotificationService";

export const AchievementsProvider = ({ children }) => {
  const { showAchievementToast, checkAchievementConditions } = useAchievementNotifications();
  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('achievements');
      return saved ? JSON.parse(saved) : initialAchievements;
    } catch (error) {
      console.error('Error loading achievements:', error);
      return initialAchievements;
    }
  });

  // State to track completed achievements
  const [completedAchievements, setCompletedAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('completedAchievements');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Ref to track achievements being processed
  const processingAchievements = useRef(new Set());

  // Save achievements to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('achievements', JSON.stringify(achievements));
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  }, [achievements]);

  // Save completed achievements to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('completedAchievements', JSON.stringify([...completedAchievements]));
    } catch (error) {
      console.error('Error saving completed achievements:', error);
    }
  }, [completedAchievements]);

  // Function to unlock an achievement
  const unlockAchievement = useCallback((achievementId) => {
    // Skip if achievement is already unlocked or being processed
    if (!achievements[achievementId] || 
        achievements[achievementId].unlocked || 
        processingAchievements.current.has(achievementId) ||
        completedAchievements.has(achievementId)) {
      return;
    }

    // Add to processing queue
    processingAchievements.current.add(achievementId);

    // Update achievement state
    setAchievements(prev => ({
      ...prev,
      [achievementId]: {
        ...prev[achievementId],
        unlocked: true,
        unlockedAt: new Date().toISOString()
      },
    }));

    // Show toast notification
    showAchievementToast(achievementId, achievements[achievementId].title);

    // Update completed achievements after animation
    setTimeout(() => {
      setCompletedAchievements(prev => {
        const next = new Set(prev);
        next.add(achievementId);
        return next;
      });
      processingAchievements.current.delete(achievementId);
    }, 5000);
  }, [achievements, completedAchievements, showAchievementToast]);

  // Check achievements
  const checkAchievements = useCallback(({ 
    completedTimers = 0,
    currentStreak = 0,
    timersInHour = 0,
    timerDuration = 0
  }) => {
    checkAchievementConditions({
      completedTimers,
      currentStreak,
      timersInHour,
      timerDuration,
      onUnlock: unlockAchievement
    });
  }, [checkAchievementConditions, unlockAchievement]);

  // Reset achievements
  const resetAchievements = useCallback(() => {
    setAchievements(initialAchievements);
    setCompletedAchievements(new Set());
    localStorage.removeItem('achievements');
    localStorage.removeItem('completedAchievements');
  }, []);

  return (
    <AchievementsContext.Provider value={{ 
      achievements, 
      unlockAchievement,
      checkAchievements,
      resetAchievements
    }}>
      {children}
    </AchievementsContext.Provider>
  );
};

AchievementsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
