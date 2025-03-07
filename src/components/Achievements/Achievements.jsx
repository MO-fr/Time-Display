import React from 'react';
import { Clock, Award, Star, Target, Zap, Timer, Heart, Medal, Trophy, AlertTriangle } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "First Timer",
      description: "Set your first timer",
      icon: <Clock className="icon-blue" />,
      unlocked: true,
    },

    {
      id: 2,
      title: "Time Keeper",
      description: "Complete 5 timers without pausing",
      icon: <Award className="icon-purple" />,
      unlocked: true,
    },

    {
      id: 3,
      title: "Early Bird",
      description: "Set a timer before 7 AM",
      icon: <Star className="icon-yellow" />,
      unlocked: true,
    },

    {
      id: 4,
      title: "Focus Master",
      description: "Complete a 25-minute focus timer 10 times",
      icon: <Target className="icon-red" />,
      unlocked: false,
    },

    {
      id: 5,
      title: "Speed Demon",
      description: "Set and complete 3 timers in one hour",
      icon: <Zap className="icon-orange" />,
      unlocked: false,
    },

    {
      id: 6,
      title: "Night Owl",
      description: "Use the app after midnight for 5 consecutive days",
      icon: <Timer className="icon-indigo" />,
      unlocked: false,
    },

    {
      id: 7,
      title: "Consistency King",
      description: "Use the timer every day for a week",
      icon: <Heart className="icon-pink" />,
      unlocked: false,
    },

    {
      id: 8,
      title: "Time Traveler",
      description: "Set timers in 3 different time zones",
      icon: <Medal className="icon-green" />,
      unlocked: false,
    },

    {
      id: 9,
      title: "Marathon Timer",
      description: "Set a timer longer than 2 hours",
      icon: <Trophy className="icon-amber" />,
      unlocked: false,
    },

    {
      id: 10,
      title: "Timer Enthusiast",
      description: "Reach a total of 100 timers completed",
      icon: <AlertTriangle className="icon-teal" />,
      unlocked: false,
    },

  ];

  return (
    <div className="achievements-container">
      <div className="achievements-content">
        <h1 className="achievements-title">Achievements</h1>
        <div className="achievements-list">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-card ${
                achievement.unlocked ? "unlocked" : "locked"
              }`}
            >
              <div className="achievement-icon-container">
                {achievement.icon}
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