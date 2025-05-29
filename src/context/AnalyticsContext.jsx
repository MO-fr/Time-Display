import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { calculateStreak, initialTimerStats } from './analyticsUtils';
import { AnalyticsContext } from './analyticsContext.base';

export const AnalyticsProvider = ({ children }) => {
  const [timerStats, setTimerStats] = useState(initialTimerStats);
  const updateTimeoutRef = useRef(null);
  const pendingUpdatesRef = useRef(null);
  
  // Used to track if we've already processed an update
  const lastUpdateRef = useRef({
    time: 0,
    duration: 0,
    isCompleted: false
  });
  // Load stats from localStorage on mount
  useEffect(() => {
    const loadStats = () => {
      const storedData = localStorage.getItem('timerStats');
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          // Ensure all fields are properly set with default values if missing
          setTimerStats(prev => ({
            ...initialTimerStats, // Start with default values
            ...prev,              // Keep current state
            ...parsed,            // Apply stored values
            // Ensure these critical values are never undefined/null
            totalTimersCompleted: parsed.totalTimersCompleted || 0,
            totalTimeSpent: parsed.totalTimeSpent || 0,
            dailyUsage: parsed.dailyUsage || [],
            popularDurations: parsed.popularDurations || {},
            currentStreak: parsed.currentStreak || 0,
            bestStreak: parsed.bestStreak || 0
          }));
          console.log('Loaded stats from localStorage:', parsed);
        } catch (e) {
          console.error('Failed to parse timer stats:', e);
          localStorage.removeItem('timerStats');
        }
      }
    };
    loadStats();
  }, []);
  // Save stats to localStorage whenever they change
  useEffect(() => {
    // Use immediate execution to update localStorage right away
    const saveToStorage = () => {
      try {
        localStorage.setItem('timerStats', JSON.stringify(timerStats));
        console.log('Saved stats to localStorage');
      } catch (error) {
        console.error('Error saving stats to localStorage:', error);
      }
    };
    saveToStorage();
  }, [timerStats]);

  // Reset stats
  const resetStats = useCallback(() => {
    setTimerStats(initialTimerStats);
    localStorage.removeItem('timerStats');
  }, []);  // Update timer usage stats
  const updateTimerUsage = useCallback((duration = 0, isCompleted = false) => {
    // Debug log to track calls
    console.log('Analytics update called with:', { duration, isCompleted });
    
    // Check for duplicate calls in quick succession
    const now = Date.now();
    const lastUpdate = lastUpdateRef.current;
    
    // If this is the same update within 500ms, ignore it
    if (now - lastUpdate.time < 500 && 
        duration === lastUpdate.duration && 
        isCompleted === lastUpdate.isCompleted) {
      console.log('Ignoring duplicate update call');
      return;
    }
    
    // Update last update reference
    lastUpdateRef.current = {
      time: now,
      duration,
      isCompleted
    };
    
    // Clear any pending update
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
      updateTimeoutRef.current = null;
    }
    
    // Store the update data
    pendingUpdatesRef.current = { duration, isCompleted };
    
    // Schedule the update to run after a short delay (to batch potential multiple calls)
    updateTimeoutRef.current = setTimeout(() => {
      const updateData = pendingUpdatesRef.current;
      pendingUpdatesRef.current = null;
      
      if (!updateData) return;
      
      const today = new Date().toLocaleDateString();
      
      // Use a state updater function to ensure we're working with the latest state
      setTimerStats(prev => {
        // Make a copy of the previous state
        const currentStats = { ...prev };
        
        // Update daily usage
        let dailyUsage = [...currentStats.dailyUsage];
        const todayIndex = dailyUsage.findIndex(day => day.date === today);
        
        if (todayIndex >= 0) {
          // Update existing entry for today
          dailyUsage[todayIndex] = {
            ...dailyUsage[todayIndex],
            count: dailyUsage[todayIndex].count + (updateData.isCompleted ? 1 : 0),
            totalTime: dailyUsage[todayIndex].totalTime + updateData.duration
          };
        } else {
          // Create new entry for today
          dailyUsage.push({
            date: today,
            count: updateData.isCompleted ? 1 : 0,
            totalTime: updateData.duration
          });
        }

        // Limit to last 30 days
        if (dailyUsage.length > 30) {
          dailyUsage = dailyUsage.slice(-30);
        }

        // Update totals - only increment completed timers if the isCompleted flag is true
        const totalTimersCompleted = currentStats.totalTimersCompleted + (updateData.isCompleted ? 1 : 0);
        const totalTimeSpent = currentStats.totalTimeSpent + updateData.duration;

        // Update streak
        const { newStreak, newBestStreak } = calculateStreak(
          currentStats.lastUsedDate,
          currentStats.currentStreak,
          currentStats.bestStreak
        );

        // Create and return the new state object
        const updatedStats = {
          ...currentStats,
          dailyUsage,
          totalTimersCompleted,
          totalTimeSpent,
          currentStreak: newStreak,
          bestStreak: newBestStreak,
          lastUsedDate: today,
        };
        
        // Debug log to see what's being updated
        console.log('Stats updated:', {
          totalBefore: currentStats.totalTimersCompleted,
          totalAfter: updatedStats.totalTimersCompleted,
          isCompleted: updateData.isCompleted
        });
        
        return updatedStats;
      });
      
      // Save to localStorage immediately
      updateTimeoutRef.current = setTimeout(() => {
        localStorage.setItem('timerStats', JSON.stringify(timerStats));
        console.log('Saved updated stats to localStorage');
      }, 0);
      
    }, 50); // Short delay to batch potential multiple calls
  }, [timerStats]);

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