import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { ChevronRight, BarChart2, Clock, Zap, Target, Award, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useTheme } from '../../hooks/useTheme';

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
  const { activeTheme } = useTheme();

  // Theme colors for different themes
  const themeColors = {
    default: { primary: '#ef4444', secondary: '#8b5cf6', accent: '#f59e0b' },
    sunset: { primary: '#fb923c', secondary: '#e11d48', accent: '#f97316' },
    ocean: { primary: '#3b82f6', secondary: '#0ea5e9', accent: '#06b6d4' },
    forest: { primary: '#22c55e', secondary: '#059669', accent: '#16a34a' },
    galaxy: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#6d28d9' },
    candy: { primary: '#f472b6', secondary: '#ec4899', accent: '#fb7185' }
  }[activeTheme] || { primary: '#ef4444', secondary: '#8b5cf6', accent: '#f59e0b' };

  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen]);

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

  // Transform daily usage data for the chart
  const dailyData = (safeTimerStats.dailyUsage || []).map(day => ({
    date: day.date,
    count: day.count || 0,
    totalTime: Math.round((day.totalTime || 0) / 60),
  }));

  // Transform popular durations for bar chart
  const durationData = Object.entries(safeTimerStats.popularDurations || {})
    .map(([duration, count]) => ({
      duration: formatTime(parseInt(duration) || 0),
      count: count || 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="analytics-container">
      <div className="analytics-main-content">
        {children}
      </div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="analytics-toggle-btn"
        aria-label={isOpen ? "Close analytics panel" : "Open analytics panel"}
        aria-expanded={isOpen}
      >
        {isOpen ? <ChevronRight className="analytics-icon" /> : <BarChart2 className="analytics-icon" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="analytics-slide-panel"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
                      color={themeColors.secondary}
                    />
                    <StatCard 
                      icon={<Zap className="stat-icon" />}
                      title="Total Timers"
                      value={safeTimerStats.totalTimersCompleted || 0}
                      color={themeColors.primary}
                    />
                    <StatCard 
                      icon={<Target className="stat-icon" />}
                      title="Current Streak"
                      value={`${safeTimerStats.currentStreak} days`}
                      color={themeColors.accent}
                    />
                    <StatCard 
                      icon={<Award className="stat-icon" />}
                      title="Best Streak"
                      value={`${safeTimerStats.bestStreak} days`}
                      color={themeColors.primary}
                    />
                  </div>
                  
                  <div className="chart-container">
                    <h3>Daily Usage</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={dailyData}>
                        <defs>
                          <linearGradient id="timerGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0.2}/>
                          </linearGradient>
                          <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={themeColors.secondary} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={themeColors.secondary} stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke="var(--border-color)"
                          vertical={false}
                        />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            boxShadow: '0 8px 16px var(--shadow-color)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          name="Timers" 
                          stroke={themeColors.primary}
                          strokeWidth={3}
                          dot={{ fill: themeColors.primary, r: 4, strokeWidth: 2 }}
                          activeDot={{ 
                            r: 6, 
                            stroke: 'var(--text-primary)', 
                            strokeWidth: 2,
                            fill: themeColors.primary
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="totalTime" 
                          name="Minutes" 
                          stroke={themeColors.secondary}
                          strokeWidth={3}
                          dot={{ fill: themeColors.secondary, r: 4, strokeWidth: 2 }}
                          activeDot={{ 
                            r: 6, 
                            stroke: 'var(--text-primary)', 
                            strokeWidth: 2,
                            fill: themeColors.secondary
                          }}
                        />
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
                      color={themeColors.primary}
                    />
                    <StatCard 
                      icon={<Clock className="stat-icon" />}
                      title="Longest Session"
                      value={formatTime(safeTimerStats.longestSession)}
                      color={themeColors.secondary}
                    />
                  </div>
                  
                  <div className="chart-container">
                    <h3>Popular Durations</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={durationData}>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={themeColors.accent} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={themeColors.accent} stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke="var(--border-color)"
                          vertical={false}
                        />
                        <XAxis 
                          dataKey="duration" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            boxShadow: '0 8px 16px var(--shadow-color)'
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          name="Times Used" 
                          fill="url(#barGradient)"
                          radius={[4, 4, 0, 0]}
                          barSize={30}
                        />
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