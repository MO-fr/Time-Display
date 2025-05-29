import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { AchievementsContext, initialAchievements } from "../utils/achievementsUtils";

// Custom achievement unlock messages
const ACHIEVEMENT_MESSAGES = {
  firstTimer: "🎉 Achievement Unlocked: First Timer Set!",
  fiveTimers: "🎯 Achievement Unlocked: Triple Timer Mastery!",
  timerEnthusiast: "⭐ Achievement Unlocked: Timer Enthusiast!",
  proTimer: "🏆 Achievement Unlocked: Pro Timer Status!",
  focusMaster: "🧠 Achievement Unlocked: Focus Master!",
  longTimer: "⏰ Achievement Unlocked: Long Timer Champion!",
  speedDemon: "⚡ Achievement Unlocked: Speed Demon!",
  consistency: "🔥 Achievement Unlocked: 3-Day Streak!",
  earlyBird: "🌅 Achievement Unlocked: Early Bird!",
  nightOwl: "🌙 Achievement Unlocked: Night Owl!"
};

// Provider component to wrap around the app and manage achievements
export const AchievementsProvider = ({ children }) => {
  // State to keep track of achievements and whether they are unlocked
  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('achievements');
      return saved ? JSON.parse(saved) : initialAchievements;
    } catch (error) {
      console.error('Error loading achievements:', error);
      return initialAchievements;
    }
  });

  // State to track completed achievements that have shown toasts
  const [completedAchievements, setCompletedAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('completedAchievements');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Ref to track achievements being processed to prevent race conditions
  const processingAchievements = useRef(new Set());

  // Save achievements to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('achievements', JSON.stringify(achievements));
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  }, [achievements]);

  // Save completed achievements to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('completedAchievements', JSON.stringify([...completedAchievements]));
    } catch (error) {
      console.error('Error saving completed achievements:', error);
    }
  }, [completedAchievements]);

  // Function to show achievement toast
  const showAchievementToast = useCallback((achievementId) => {
    const achievementData = achievements[achievementId];
    if (!achievementData) return;

    toast.custom((t) => (
      <div 
        className={`achievement-toast ${t.visible ? 'slide-in' : ''}`}
        role="alert"
        aria-live="polite"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.25rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '0.75rem',
          boxShadow: '0 8px 16px var(--shadow-color)',
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          transform: `translateY(${t.visible ? '0' : '100%'})`,
          opacity: t.visible ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        }}
      >
        <div 
          className="achievement-icon" 
          style={{
            fontSize: '2.5rem',
            lineHeight: 1,
            filter: 'drop-shadow(0 2px 4px var(--shadow-color))',
            transform: t.visible ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
        >
          {ACHIEVEMENT_MESSAGES[achievementId]?.split(' ')[0] || '🏆'}
        </div>
        <div className="achievement-content" style={{ 
          flex: 1,
          opacity: t.visible ? 1 : 0,
          transform: `translateX(${t.visible ? '0' : '-10px'})`,
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s'
        }}>
          <h3 
            style={{ 
              margin: '0 0 0.375rem 0',
              color: 'var(--text-primary)',
              fontSize: '1.125rem',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {achievementData.title}
          </h3>
          <p 
            style={{ 
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              lineHeight: 1.4,
            }}
          >
            {achievementData.description}
          </p>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'bottom-left',
      onDismiss: () => {
        // Add to completed achievements after animation
        setCompletedAchievements(prev => {
          const next = new Set(prev);
          next.add(achievementId);
          return next;
        });
        // Remove from processing queue
        processingAchievements.current.delete(achievementId);
      }
    });
  }, [achievements]);

  // Function to unlock an achievement with improved handling
  const unlockAchievement = useCallback((achievementId) => {
    // Skip if achievement is already unlocked, doesn't exist, or is being processed
    if (!achievements[achievementId] || 
        achievements[achievementId].unlocked || 
        processingAchievements.current.has(achievementId) ||
        completedAchievements.has(achievementId)) {
      return;
    }

    // Add to processing queue
    processingAchievements.current.add(achievementId);

    // Update achievement state with timestamp
    setAchievements(prev => ({
      ...prev,
      [achievementId]: {
        ...prev[achievementId],
        unlocked: true,
        unlockedAt: new Date().toISOString()
      },
    }));

    // Show achievement toast
    showAchievementToast(achievementId);
  }, [achievements, completedAchievements, showAchievementToast]);

  // Check achievement conditions with improved validation
  const checkAchievements = useCallback(({ 
    completedTimers = 0,
    currentStreak = 0,
    timersInHour = 0,
    timerDuration = 0
  }) => {
    const checks = [
      {
        id: 'firstTimer',
        condition: timerDuration > 0 || completedTimers === 1,
      },
      {
        id: 'fiveTimers',
        condition: completedTimers === 5,
      },
      {
        id: 'timerEnthusiast',
        condition: completedTimers === 10,
      },
      {
        id: 'proTimer',
        condition: completedTimers === 50,
      },
      {
        id: 'focusMaster',
        condition: timerDuration === 1500, // 25 minutes
      },
      {
        id: 'longTimer',
        condition: timerDuration === 3600, // 1 hour
      },
      {
        id: 'speedDemon',
        condition: timersInHour >= 3,
      },
      {
        id: 'consistency',
        condition: currentStreak >= 3,
      }
    ];

    // Validate and check regular achievements
    checks.forEach(({ id, condition }) => {
      if (condition) {
        unlockAchievement(id);
      }
    });

    // Check time-based achievements
    const currentHour = new Date().getHours();
    if (timerDuration > 0) {
      if (currentHour < 7) {
        unlockAchievement('earlyBird');
      }
      if (currentHour >= 0 && currentHour < 4) {
        unlockAchievement('nightOwl');
      }
    }
  }, [unlockAchievement]);

  return (
    <AchievementsContext.Provider value={{ 
      achievements, 
      unlockAchievement,
      checkAchievements 
    }}>
      {children}
    </AchievementsContext.Provider>
  );
};

AchievementsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
