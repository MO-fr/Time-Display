
import React from 'react';
import { Clock, Award, Star, Target, Zap, Timer, Heart, Medal, Trophy, AlertTriangle } from 'lucide-react';
import { useAchievements } from '../../context/AchievementsContext';

const Achievements = () => {
  const { achievements } = useAchievements();

  const getIcon = (iconName) => {
    const icons = {
      Clock: <Clock className="icon-blue" />,
      Award: <Award className="icon-purple" />,
      Star: <Star className="icon-yellow" />,
      Target: <Target className="icon-red" />,
      Zap: <Zap className="icon-orange" />,
      Timer: <Timer className="icon-indigo" />,
      Heart: <Heart className="icon-pink" />,
      Medal: <Medal className="icon-green" />,
      Trophy: <Trophy className="icon-amber" />,
      AlertTriangle: <AlertTriangle className="icon-teal" />,
    };
    return icons[iconName];
  };

  return (
    <div className="achievements-container">
      <div className="achievements-content">
        <h1 className="achievements-title">Achievements</h1>
        <div className="achievements-list">
          {Object.values(achievements).map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-card ${
                achievement.unlocked ? "unlocked" : "locked"
              }`}
            >
              <div className="achievement-icon-container">
                {getIcon(achievement.icon)}
              </div>
              <div className="achievement-details">
                <h2 className="achievement-title">{achievement.title}</h2>
                <p className="achievement-description">
                  {achievement.description}
                </p>
              </div>
              {!achievement.unlocked && (
                <div className="lock-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
