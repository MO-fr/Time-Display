import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X } from "lucide-react";

const PRESET_TIMERS = [
  { id: 'pomodoro', label: 'Pomodoro', minutes: 25, icon: '🎯' },
  { id: 'short-break', label: 'Short Break', minutes: 5, icon: '☕' },
  { id: 'focus', label: 'Focus', minutes: 50, icon: '💡' },
  { id: 'meeting', label: 'Meeting', minutes: 30, icon: '👥' },
  { id: 'quick', label: 'Quick Timer', minutes: 10, icon: '⚡' }
];

const TimerPresets = ({ isOpen, onClose, onSelectPreset, activePreset }) => {
  const handlePresetSelect = (minutes) => {
    onSelectPreset({
      hours: Math.floor(minutes / 60),
      minutes: minutes % 60,
      seconds: 0
    });
    onClose();
  };

  return (
    <div className="timer-presets-container">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="timer-presets-panel"
              initial={{ x: -20, opacity: 0, scale: 0.95 }}
              animate={{ 
                x: 0, 
                opacity: 1, 
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }
              }}
              exit={{ 
                x: -20, 
                opacity: 0, 
                scale: 0.95,
                transition: {
                  duration: 0.2
                }
              }}
            >
              <div className="timer-presets-header">
                <div className="presets-title">
                  <Clock className="w-5 h-5" /> Timer Presets
                </div>
                <button
                  onClick={onClose}
                  className="themed-button round"
                  aria-label="Close presets panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="presets-list">
                {PRESET_TIMERS.map((preset, index) => (
                  <motion.button
                    key={preset.id}
                    className={`preset-button ${activePreset === preset.minutes ? 'active' : ''}`}
                    whileHover={{ scale: 1.02, translateX: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePresetSelect(preset.minutes)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        delay: index * 0.08,
                        type: 'spring',
                        stiffness: 300,
                        damping: 30
                      }
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                      transition: {
                        duration: 0.2,
                        delay: index * 0.05
                      }
                    }}
                  >
                    <span className="preset-icon">{preset.icon}</span>
                    <div className="preset-info">
                      <span className="preset-label">{preset.label}</span>
                      <span className="preset-time">{preset.minutes} min</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

TimerPresets.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectPreset: PropTypes.func.isRequired,
  activePreset: PropTypes.number
};

export default TimerPresets;
