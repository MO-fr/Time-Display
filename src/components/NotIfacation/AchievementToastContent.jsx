import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const AchievementToastContent = ({ message, emoji, visible = true }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 10 }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8
        }}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem'
        }}
      >
        <motion.span
          initial={{ rotate: -30, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            delay: 0.1
          }}
          style={{ 
            fontSize: '2rem',
            display: 'block'
          }}
        >
          {emoji}
        </motion.span>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ 
            margin: '0 0 0.25rem 0',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)'
          }}>
            Achievement Unlocked!
          </h3>
          <p style={{ 
            margin: 0,
            fontSize: '0.9rem',
            opacity: 0.9,
            color: 'var(--text-secondary)'
          }}>
            {message}
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

AchievementToastContent.propTypes = {
  message: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  visible: PropTypes.bool
};

export default AchievementToastContent;
