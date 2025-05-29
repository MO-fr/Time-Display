import { useCallback } from 'react';
import ToastService from './ToastNoti';
import AchievementToastContent from './AchievementToastContent';

// Achievement messages with emojis
export const ACHIEVEMENT_MESSAGES = {
  firstTimer: "🎉 First Timer",
  fiveTimers: "🎯 FIVE Time Master",
  timerEnthusiast: "⭐ Timer Enthusiast",
  proTimer: "🏆 Pro Timer",
  focusMaster: "🧠 Focus Master",
  longTimer: "⏰ Long Timer Champion",
  speedDemon: "⚡ Speed Demon",
  consistency: "🔥 3-Day Streak Master",
  earlyBird: "🌅 Early Bird",
  nightOwl: "🌙 Night Owl"
};

/**
 * Hook for managing achievement notifications
 */
export const useAchievementNotifications = () => {
  const showAchievementToast = useCallback((achievementId, achievementTitle) => {
    const message = ACHIEVEMENT_MESSAGES[achievementId] || achievementTitle;
    const emoji = message?.split(' ')[0] || '🏆';
    
    ToastService.custom(
      ({ visible }) => (
        <AchievementToastContent 
          message={message} 
          emoji={emoji} 
          visible={visible} 
        />
      ),
      {
        duration: 5000,
        className: 'achievement-toast',
      }
    );
  }, []);

  const checkAchievementConditions = useCallback(({ 
    completedTimers = 0,
    currentStreak = 0,
    timersInHour = 0,
    timerDuration = 0,
    onUnlock
  }) => {
    const conditions = [
      {
        id: 'firstTimer',
        check: timerDuration > 0 || completedTimers === 1
      },
      {
        id: 'fiveTimers',
        check: completedTimers === 5
      },
      {
        id: 'timerEnthusiast',
        check: completedTimers === 10
      },
      {
        id: 'proTimer',
        check: completedTimers === 50
      },
      {
        id: 'focusMaster',
        check: timerDuration === 1500 // 25 minutes
      },
      {
        id: 'longTimer',
        check: timerDuration === 3600 // 1 hour
      },
      {
        id: 'speedDemon',
        check: timersInHour >= 3
      },
      {
        id: 'consistency',
        check: currentStreak >= 3
      }
    ];

    // Check regular achievements
    conditions.forEach(({ id, check }) => {
      if (check) {
        onUnlock(id);
      }
    });

    // Check time-based achievements
    const currentHour = new Date().getHours();
    if (timerDuration > 0) {
      if (currentHour < 7) {
        onUnlock('earlyBird');
      }
      if (currentHour >= 0 && currentHour < 4) {
        onUnlock('nightOwl');
      }
    }
  }, []);

  return {
    showAchievementToast,
    checkAchievementConditions
  };
};
