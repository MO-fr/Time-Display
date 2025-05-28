import { useState } from "react";
import PropTypes from "prop-types";
import { AchievementsContext, initialAchievements } from "../utils/achievementsUtils";

// Provider component to wrap around the app and manage achievements
export const AchievementsProvider = ({ children }) => {
  // State to keep track of achievements and whether they are unlocked
  const [achievements, setAchievements] = useState(initialAchievements);

  // Function to unlock an achievement
  const unlockAchievement = (achievementId) => {
    if (!achievements[achievementId].unlocked) {
      setAchievements((prev) => ({
        ...prev,
        [achievementId]: {
          ...prev[achievementId],
          unlocked: true,
        },
      }));
      console.log(`Achievement unlocked: ${achievements[achievementId].title}!`);
    }
  };

  return (
    <AchievementsContext.Provider value={{ achievements, unlockAchievement }}>
      {children}
    </AchievementsContext.Provider>
  );
};

AchievementsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
