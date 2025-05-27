import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';
import { ChevronRight, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAnalytics } from '../../context/AnalyticsContext';

const AnalyticsCard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { timerUsageData } = useAnalytics();

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

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
                {/* Single chart */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timerUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="timers" stroke="#8884d8" activeDot={{ r: 4 }} />
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

// Add PropTypes validation
AnalyticsCard.propTypes = {
  children: PropTypes.node, // Validate that children is a React node
};

export default AnalyticsCard;