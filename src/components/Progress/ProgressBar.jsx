import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimatePresence } from "framer-motion";

// This component shows a circular progress meter with remaining time
const ProgressBar = ({ progress, isStopwatch }) => {
  if (isStopwatch) return null;

  // Calculate the percentage, ensure it's between 0 and 100, and round to nearest integer
  const percentage = Math.round(Math.min(100, Math.max(0, progress || 0)));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="progress-container"
        style={{
          width: "200px",
          height: "200px",
          margin: "0 auto",
          filter: "drop-shadow(0px 4px 8px var(--shadow-color))",
        }}
      >
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={8}
          styles={buildStyles({
            // Colors
            pathColor: `var(--accent-color)`,
            textColor: `var(--text-primary)`,
            trailColor: `var(--bg-secondary)`,

            // Text size and font
            textSize: "20px",

            // Rotation and stroke
            rotation: 0.25,
            strokeLinecap: "round",

            // Animation
            pathTransition:
              progress === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s",
          })}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// Define the types of props this component expects
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // The progress percentage (0 to 100)
  isStopwatch: PropTypes.bool.isRequired, // Whether it's in stopwatch mode (true/false)
};

export default ProgressBar;