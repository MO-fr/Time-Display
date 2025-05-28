/**
 * Updates the streak based on the last used date
 * @param {string} lastUsedDate - The last date the timer was used
 * @param {number} currentStreak - The current streak count
 * @param {number} bestStreak - The best streak achieved
 * @returns {Object} Updated streak values
 */
export const calculateStreak = (lastUsedDate, currentStreak, bestStreak) => {
  let newStreak = currentStreak;
  let newBestStreak = bestStreak;

  if (lastUsedDate) {
    const lastDate = new Date(lastUsedDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate.toDateString() === yesterday.toDateString()) {
      newStreak += 1;
      newBestStreak = Math.max(newStreak, newBestStreak);
    } else if (lastDate.toDateString() !== new Date().toDateString()) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
    newBestStreak = 1;
  }

  return { newStreak, newBestStreak };
};

/**
 * Initial state for the analytics context
 */
export const initialTimerStats = {
  dailyUsage: [],
  totalTimeSpent: 0,
  averageSessionLength: 0,
  longestSession: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastUsedDate: null,
  popularDurations: {},
  totalTimersCompleted: 0
};
