import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { ChevronRight, BarChart2, Clock, Zap, Target, Award, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="stat-card" style={{ 
    '--accent-color': color,
    '--hover-color': `${color}33` // 20% opacity version of the color
  }}>
    <div className="stat-card-icon">
      {icon}
    </div>
    <div className="stat-card-content">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

StatCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  color: PropTypes.string.isRequired
};

const AnalyticsCard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { timerStats, resetStats } = useAnalytics();

  // Debug log when timerStats updates
  useEffect(() => {
    console.log('Analytics component received stats:', {
      totalTimersCompleted: timerStats.totalTimersCompleted,
      totalTimeSpent: timerStats.totalTimeSpent
    });
  }, [timerStats.totalTimersCompleted, timerStats.totalTimeSpent]);

  const toggleCard = () => {
    setIsOpen(!isOpen);
    // Reset to overview tab when closing
    if (isOpen) {
      setActiveTab('overview');
    }
  };

  // Ensure timerStats has all required properties with default values
  const safeTimerStats = {
    dailyUsage: [],
    popularDurations: {},
    totalTimeSpent: 0,
    totalTimersCompleted: 0,
    currentStreak: 0,
    bestStreak: 0,
    averageSessionLength: 0,
    longestSession: 0,
    ...timerStats
  };

  // Transform daily usage data for the chart with error handling
  const dailyData = (safeTimerStats.dailyUsage || []).map(day => ({
    date: day.date,
    count: day.count || 0,
    totalTime: Math.round((day.totalTime || 0) / 60), // Convert to minutes
  }));

  // Transform popular durations for bar chart with error handling
  const durationData = Object.entries(safeTimerStats.popularDurations || {})
    .map(([duration, count]) => ({
      duration: formatTime(parseInt(duration) || 0),
      count: count || 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Show top 5 most used durations

  return (
    <div className="analytics-container">
      <div className="analytics-main-content">
        {children}
      </div>
      
      <button 
        onClick={toggleCard}
        className="analytics-toggle-btn"
        aria-label={isOpen ? "Close analytics panel" : "Open analytics panel"}
        aria-expanded={isOpen}
      >
        {isOpen ? <ChevronRight className="analytics-icon" /> : <BarChart2 className="analytics-icon" />}
      </button>      <AnimatePresence>
        {isOpen && (
          <motion.div            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="analytics-slide-panel"
          >
            <div className="analytics-panel-content">
              <div className="analytics-header">
                <h2>Timer Analytics</h2>
                <div className="analytics-header-controls">
                  <div className="analytics-tabs">
                    <button 
                      className={activeTab === 'overview' ? 'active' : ''}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button 
                      className={activeTab === 'details' ? 'active' : ''}
                      onClick={() => setActiveTab('details')}
                    >
                      Details
                    </button>
                  </div>
                  <button 
                    onClick={resetStats}
                    className="reset-button themed-button round"
                    title="Reset all analytics data"
                    aria-label="Reset all analytics data"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {activeTab === 'overview' ? (
                <div className="analytics-overview">
                  <div className="stats-grid">
                    <StatCard 
                      icon={<Clock className="stat-icon" />}
                      title="Total Time"
                      value={formatTime(safeTimerStats.totalTimeSpent)}
                      color="#3b82f6"
                    />
                    <StatCard 
                      icon={<Zap className="stat-icon" />}
                      title="Total Timers"
                      value={safeTimerStats.totalTimersCompleted || 0}
                      color="#8b5cf6"
                    />
                    <StatCard 
                      icon={<Target className="stat-icon" />}
                      title="Current Streak"
                      value={`${safeTimerStats.currentStreak} days`}
                      color="#ef4444"
                    />
                    <StatCard 
                      icon={<Award className="stat-icon" />}
                      title="Best Streak"
                      value={`${safeTimerStats.bestStreak} days`}
                      color="#f59e0b"
                    />
                  </div>

                  <div className="chart-container">
                    <h3>Daily Usage</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="date" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" name="Timers" activeDot={{ r: 3 }} />
                        <Line type="monotone" dataKey="totalTime" stroke="#82ca9d" name="Minutes" activeDot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="analytics-details">
                  <div className="stats-grid">
                    <StatCard 
                      icon={<Clock className="stat-icon" />}
                      title="Average Session"
                      value={formatTime(safeTimerStats.averageSessionLength)}
                      color="#3b82f6"
                    />
                    <StatCard 
                      icon={<Clock className="stat-icon" />}
                      title="Longest Session"
                      value={formatTime(safeTimerStats.longestSession)}
                      color="#8b5cf6"
                    />
                  </div>

                  <div className="chart-container">
                    <h3>Popular Durations</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={durationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="duration" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" name="Times Used" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

AnalyticsCard.propTypes = {
  children: PropTypes.node.isRequired
};

AnalyticsCard.displayName = 'AnalyticsCard';
StatCard.displayName = 'StatCard';

export default AnalyticsCard;
