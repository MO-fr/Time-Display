import PropTypes from "prop-types";

// This component shows a progress bar with a percentage
const ProgressBar = ({ progress, isStopwatch }) => {
  return (
    <div className={`progress-bar-container ${isStopwatch ? 'hide' : ''}`}>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

// Define the types of props this component expects
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // The progress percentage (a number)
  isStopwatch: PropTypes.bool.isRequired, // Whether it's in stopwatch mode (true/false)
};

export default ProgressBar;