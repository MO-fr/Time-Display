import React from 'react';
import { Play, Pause, RotateCcw, Timer, Clock } from 'lucide-react';

//This code handles all the logic and events 

const TimerUI = ({
  time,
  isRunning,
  isStopwatch,
  inputHours,
  inputMinutes,
  inputSeconds,
  formatTime,
  handleStartStop,
  handleReset,
  handleModeSwitch,
  startCountdownTimer,
  setInputHours,
  setInputMinutes,
  setInputSeconds,
}) => {
  return (
    <div className="timer-card">
      {/* Switch between Stopwatch and Timer */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={handleModeSwitch} className="mode-switch-button">
          {isStopwatch ? <Timer className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          Switch to {isStopwatch ? 'Timer' : 'Stopwatch'}
        </button>
      </div>

      {/* Display the current time */}
      <div className="timer-display">{formatTime(time)}</div>

      {/* Input fields for hours, minutes, and seconds (only shown in Timer mode) */}
      {!isStopwatch && (
        <div className="timer-input-container">
          <input
            type="number"
            min="0"
            value={inputHours}
            onChange={(e) => setInputHours(parseInt(e.target.value) || 0)}
            className="timer-input"
            placeholder="HH"
          />
          <span className="timer-separator">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(parseInt(e.target.value) || 0)}
            className="timer-input"
            placeholder="MM"
          />
          <span className="timer-separator">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(parseInt(e.target.value) || 0)}
            className="timer-input"
            placeholder="SS"
          />
        </div>
      )}

      {/* Buttons to control the timer */}
      <div className="timer-controls">
        {isStopwatch || time > 0 ? (
          <button onClick={handleStartStop} className="timer-button">
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
        ) : (
          <button onClick={startCountdownTimer} className="timer-button">
            Start Timer
          </button>
        )}

        <button onClick={handleReset} className="timer-button">
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TimerUI;