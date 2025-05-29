import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Award, Star, Target, Zap, Timer, Heart, Medal, Trophy, AlertTriangle, Check, Filter, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useAchievements } from '../../utils/achievementsUtils';

const achievementCategories = {
  milestones: {
    title: "Milestones",
    ids: ['firstTimer', 'fiveTimers', 'timerEnthusiast', 'proTimer'],
  },
  timers: {
    title: "Timer Mastery",
    ids: ['focusMaster', 'longTimer', 'speedDemon'],
  },
  consistency: {
    title: "Timing Patterns",
    ids: ['consistency', 'earlyBird', 'nightOwl'],
  },
};

const Achievements = () => {
  const { achievements, resetAchievements } = useAchievements();
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAchievements = (ids) => {
    return ids.map(id => achievements[id])
      .filter(achievement => !showOnlyCompleted || achievement.unlocked);
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };
  const confirmReset = () => {
    resetAchievements();
    setShowResetConfirm(false);
    toast.success("Achievements reset successfully", {
      duration: 4000,
      position: "bottom-left",
      style: {
        background: 'var(--bg-card)',
        border: '2px solid var(--accent-color)',
        color: 'var(--text-primary)',
        boxShadow: '0 12px 32px var(--shadow-color)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }
    });
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <div className="achievements-page">
      <div className="achievements-header">
        <h1 className="achievements-title">Progress Hub</h1>
        <div className="achievements-controls">
          <button
            onClick={() => setShowOnlyCompleted(!showOnlyCompleted)}
            className="filter-button"
            aria-pressed={showOnlyCompleted}
          >
            <Filter size={20} />
            {showOnlyCompleted ? 'Show All' : 'Show Completed'}
          </button>
          <button
            onClick={handleResetClick}
            className="reset-button"
            aria-label="Reset Achievements"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {showResetConfirm && (
        <div className="reset-confirm-modal" role="alertdialog" aria-labelledby="resetTitle">
          <div className="reset-confirm-content">
            <h2 id="resetTitle">Reset Achievements?</h2>
            <p>This will clear all your achievement progress. This action cannot be undone.</p>
            <div className="reset-confirm-buttons">
              <button onClick={cancelReset} className="cancel-button">Cancel</button>
              <button onClick={confirmReset} className="confirm-button">Reset</button>
            </div>
          </div>
        </div>
      )}

      <div className="achievements-categories">
        {Object.entries(achievementCategories).map(([categoryKey, category]) => {
          const categoryAchievements = filteredAchievements(category.ids);
          if (categoryAchievements.length === 0) return null;

          return (
            <motion.section
              key={categoryKey}
              className="achievement-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="category-title">{category.title}</h2>
              <div className="achievements-grid">
                <AnimatePresence>
                  {categoryAchievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      layoutId={`achievement-${achievement.id}`}
                      className={`achievement-card ${achievement.unlocked ? "unlocked" : "locked"}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="achievement-content">
                        <div className="achievement-icon-container">
                          {getIcon(achievement.icon)}
                          {achievement.unlocked && (
                            <motion.div 
                              className="completion-badge"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <Check className="w-4 h-4" />
                            </motion.div>
                          )}
                        </div>
                        <div className="achievement-details">
                          <h3 className="achievement-title">{achievement.title}</h3>
                          <p className="achievement-description">{achievement.description}</p>
                          {achievement.unlocked && (
                            <span className="completion-date">
                              Earned on {formatDate(achievement.unlockedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                      {!achievement.unlocked && (
                        <div className="achievement-overlay">
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
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
