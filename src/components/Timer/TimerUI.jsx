import { Play, Pause, RotateCcw, Timer, Clock } from "lucide-react";
import PropTypes from 'prop-types';
import ProgressBar from "../Progress/ProgressBar";
import AnalyticsCard from "../Analytics/Analytic";

const TimerUI = ({
  timerState,
  inputTime,
  formatTime,
  handleStartStop,
  handleReset,
  handleModeSwitch,
  startCountdownTimer,
  updateInputTime,
}) => {
  // Calculate progress for the progress bar
  const calculateProgress = () => {
    if (timerState.isStopwatch) {
      return 0;
    }

    // For countdown timer
    if (!timerState.time) return 0;
    
    const totalSeconds = inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds;
    if (totalSeconds === 0) return 0;
    
    const progress = ((totalSeconds - timerState.time) / totalSeconds) * 100;
    return Math.min(100, Math.max(0, progress)); // Ensure progress is between 0 and 100
  };

  return (
    <AnalyticsCard>
      <div className="timer-container">
        <div className="timer-card">
          <div className="timer-mode-switch">
            <button onClick={handleModeSwitch} className="themed-button">
              {timerState.isStopwatch ? 
                <Timer className="w-5 h-5" /> : 
                <Clock className="w-5 h-5" />
              }
              <span>Switch to {timerState.isStopwatch ? "Timer" : "Stopwatch"}</span>
            </button>
          </div>

          <div className="timer-display">{formatTime(timerState.time)}</div>

          {!timerState.isStopwatch && (
            <div className="timer-input-container">
              <input
                type="number"
                min="0"
                value={inputTime.hours}
                onChange={(e) => updateInputTime("hours", parseInt(e.target.value) || 0)}
                className="timer-input"
                placeholder="HH"
              />
              <span className="timer-separator">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={inputTime.minutes}
                onChange={(e) => updateInputTime("minutes", parseInt(e.target.value) || 0)}
                className="timer-input"
                placeholder="MM"
              />
              <span className="timer-separator">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={inputTime.seconds}
                onChange={(e) => updateInputTime("seconds", parseInt(e.target.value) || 0)}
                className="timer-input"
                placeholder="SS"
              />
            </div>
          )}          <div className="timer-control-section">
            <div className="timer-controls">
              {timerState.isStopwatch || timerState.time > 0 ? (
                <button onClick={handleStartStop} className="themed-button round">
                  {timerState.isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
              ) : (
                <button onClick={startCountdownTimer} className="themed-button">
                  Start Timer
                </button>
              )}
              <button onClick={handleReset} className="themed-button round">
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
            <ProgressBar progress={calculateProgress()} isStopwatch={timerState.isStopwatch} />
          </div>
        </div>
      </div>
    </AnalyticsCard>
  );
};

TimerUI.propTypes = {
  timerState: PropTypes.shape({
    time: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    isStopwatch: PropTypes.bool.isRequired
  }).isRequired,
  inputTime: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  }).isRequired,
  formatTime: PropTypes.func.isRequired,
  handleStartStop: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleModeSwitch: PropTypes.func.isRequired,
  startCountdownTimer: PropTypes.func.isRequired,
  updateInputTime: PropTypes.func.isRequired
};

export default TimerUI;