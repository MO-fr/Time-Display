import { useContext, useCallback } from 'react';
import { AnalyticsContext } from '../context/analyticsContext.base';

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === null) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  
  // Wrap the updateTimerUsage function to ensure it's stable
  // This prevents unnecessary re-renders and potential double calls
  const stableUpdateTimerUsage = useCallback((duration, isCompleted) => {
    console.log('useAnalytics.stableUpdateTimerUsage called with:', { duration, isCompleted });
    context.updateTimerUsage(duration, isCompleted);
  }, [context]); // Include the full context as a dependency
  
  return {
    timerStats: context.timerStats,
    updateTimerUsage: stableUpdateTimerUsage,
    resetStats: context.resetStats
  };
}
