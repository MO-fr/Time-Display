import PropTypes from "prop-types";
import { useEffect } from "react";
import { useAchievements } from "../../utils/achievementsUtils";

const AchievementsTracker = ({ timerState, completedTimers, timersInHour, currentStreak }) => {
  const { checkAchievements } = useAchievements();

  // Check achievements every time relevant stats change
  useEffect(() => {
    if (timerState.isRunning || completedTimers > 0) {
      checkAchievements({
        completedTimers,
        timersInHour,
        currentStreak,
        timerDuration: timerState.initialTime,
      });
    }
  }, [
    completedTimers,
    timersInHour,
    currentStreak,
    timerState.isRunning,
    timerState.initialTime,
    checkAchievements,
  ]);

  return null;
};

AchievementsTracker.propTypes = {
  timerState: PropTypes.shape({
    isRunning: PropTypes.bool.isRequired,
    initialTime: PropTypes.number.isRequired,
  }).isRequired,
  completedTimers: PropTypes.number.isRequired,
  timersInHour: PropTypes.number.isRequired,
  currentStreak: PropTypes.number.isRequired,
};

export default AchievementsTracker;