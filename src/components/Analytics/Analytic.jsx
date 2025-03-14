import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsCard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  // Mock data for the charts
  const timerUsageData = [
    { time: 'Day 1', timers: 5 },
    { time: 'Day 2', timers: 10 },
    { time: 'Day 3', timers: 7 },
    { time: 'Day 4', timers: 12 },
    { time: 'Day 5', timers: 8 },
  ];

  const averageDurationData = [
    { time: 'Day 1', duration: 30 },
    { time: 'Day 2', duration: 45 },
    { time: 'Day 3', duration: 35 },
    { time: 'Day 4', duration: 50 },
    { time: 'Day 5', duration: 40 },
  ];

  const completionRateData = [
    { time: 'Day 1', completion: 80 },
    { time: 'Day 2', completion: 70 },
    { time: 'Day 3', completion: 90 },
    { time: 'Day 4', completion: 85 },
    { time: 'Day 5', completion: 75 },
  ];

  const peakUsageData = [
    { hour: '0-4', timers: 2 },
    { hour: '4-8', timers: 5 },
    { hour: '8-12', timers: 15 },
    { hour: '12-16', timers: 20 },
    { hour: '16-20', timers: 10 },
    { hour: '20-24', timers: 8 },
  ];

  return (
    <div className="analytics-container">
      {/* Main content (Timer) */}
      <div className="analytics-main-content">
        {children}
        
        {/* Analytics button integrated into the timer card */}
        <div className="analytics-button-container">
          <button 
            onClick={toggleCard}
            className="analytics-toggle-btn"
            aria-label={isOpen ? "Close analytics panel" : "Open analytics panel"}
          >
            {isOpen ? 
              <ChevronRight className="analytics-icon" /> : 
              <BarChart2 className="analytics-icon" />
            }
          </button>
        </div>
      </div>

      {/* Slide-out card - slides from inside the timer card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0, scale: 0.8 }}
            animate={{ x: '0%', opacity: 1, scale: 1 }}
            exit={{ x: '-100%', opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="analytics-slide-panel"
          >
            <div className="analytics-panel-content">
              <div className="analytics-placeholder">
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={timerUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="timers" stroke="#8884d8" activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={averageDurationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="duration" stroke="#82ca9d" activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={completionRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="completion" stroke="#ffc658" activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={peakUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="hour" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="timers" stroke="#ff7300" activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsCard;