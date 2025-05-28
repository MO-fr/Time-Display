import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { calculateStreak, initialTimerStats } from './analyticsUtils';
import { AnalyticsContext } from './analyticsContext.base';

export const AnalyticsProvider = ({ children }) => {
  const [timerStats, setTimerStats] = useState(initialTimerStats);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    const storedData = localStorage.getItem('timerStats');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setTimerStats(prev => ({
          ...prev,
          ...parsed,
          totalTimersCompleted: parsed.totalTimersCompleted || 0
        }));
      } catch (e) {
        console.error('Failed to parse timer stats:', e);
        localStorage.removeItem('timerStats');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timerStats', JSON.stringify(timerStats));
  }, [timerStats]);

  const resetStats = useCallback(() => {
    console.log('Resetting all timer statistics');
    setTimerStats(initialTimerStats);
    localStorage.removeItem('timerStats');
  }, []);

  const updateTimerUsage = useCallback((duration = 0, isCompleted = false) => {
    const today = new Date().toLocaleDateString();
    console.log('Updating timer usage:', { duration, isCompleted, today });
    
    setTimerStats(prev => {
      // Ensure we have the base structure
      const currentStats = {
        ...prev,
        dailyUsage: prev.dailyUsage || [],
        totalTimersCompleted: prev.totalTimersCompleted || 0,
        totalTimeSpent: prev.totalTimeSpent || 0
      };
      
      // Update daily usage and completion count
      let newDailyUsage = [...currentStats.dailyUsage];
      const todayEntry = newDailyUsage.find(item => item.date === today);
      
      if (todayEntry) {
        todayEntry.count += isCompleted ? 1 : 0;
        todayEntry.totalTime += duration;
      } else {
        newDailyUsage.push({ 
          date: today, 
          count: isCompleted ? 1 : 0, 
          totalTime: duration 
        });
        // Keep only last 30 days
        if (newDailyUsage.length > 30) {
          newDailyUsage = newDailyUsage.slice(-30);
        }
      }

      // Update total timers completed only when a timer actually completes
      const totalTimersCompleted = isCompleted 
        ? (currentStats.totalTimersCompleted + 1)
        : currentStats.totalTimersCompleted;

      // Update streak and popular durations
      const { newStreak, newBestStreak } = calculateStreak(
        prev.lastUsedDate,
        prev.currentStreak,
        prev.bestStreak
      );

      const newPopularDurations = { ...prev.popularDurations };
      if (duration > 0) {
        const durationKey = Math.floor(duration / 60) * 60;
        newPopularDurations[durationKey] = (newPopularDurations[durationKey] || 0) + 1;
      }
      
      const updatedStats = {
        ...currentStats,
        totalTimersCompleted,
        totalTimeSpent: currentStats.totalTimeSpent + duration,
        dailyUsage: newDailyUsage,
        lastUsedDate: today,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        averageSessionLength: duration > 0 
          ? Math.round((currentStats.averageSessionLength * currentStats.totalTimersCompleted + duration) / (currentStats.totalTimersCompleted + 1))
          : currentStats.averageSessionLength,
        longestSession: Math.max(prev.longestSession, duration),
        popularDurations: newPopularDurations,
      };
      
      console.log('Updated stats:', {
        totalTimersCompleted: updatedStats.totalTimersCompleted,
        totalTimeSpent: updatedStats.totalTimeSpent
      });
      
      return updatedStats;
    });
  }, []);

  return (
    <AnalyticsContext.Provider value={{ 
      timerStats, 
      updateTimerUsage, 
      resetStats 
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

AnalyticsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
