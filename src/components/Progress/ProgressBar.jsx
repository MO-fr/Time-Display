import PropTypes from "prop-types";

// This component shows a progress bar with a percentage
const ProgressBar = ({ progress, isStopwatch }) => {
  // If it's in stopwatch mode, don't show the progress bar
  if (isStopwatch) {
    return null;
  }

  // Render the progress bar and the percentage
  return (
    <div className="progress-bar-container">
      {/* The width of this div changes based on the progress */}
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      {/* Show the progress percentage */}
      <div className="progress-percentage">{progress.toFixed(0)}%</div>
    </div>
  );
};

// Define the types of props this component expects
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // The progress percentage (a number)
  isStopwatch: PropTypes.bool.isRequired, // Whether it's in stopwatch mode (true/false)
};

export default ProgressBar;