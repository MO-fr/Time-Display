import React from 'react';
import { Play, Pause, RotateCcw, Timer, Clock } from 'lucide-react'; // These are icons for the buttons

const TimerUI = ({
  time, // The current time in seconds
  isRunning, // Whether the timer is running or paused
  isStopwatch, // Whether it's in stopwatch mode (counting up) or timer mode (counting down)
  inputHours, // The hours the user typed in
  inputMinutes, // The minutes the user typed in
  inputSeconds, // The seconds the user typed in
  formatTime, // A function to format the time into HH:MM:SS
  handleStartStop, // A function to start or stop the timer
  handleReset, // A function to reset the timer
  handleModeSwitch, // A function to switch between stopwatch and timer modes
  startCountdownTimer, // A function to start the countdown timer
  setInputHours, // A function to update the hours input
  setInputMinutes, // A function to update the minutes input
  setInputSeconds, // A function to update the seconds input
}) => {
  return (
    <div className="timer-card">
      {/* Button to switch between stopwatch and timer modes */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={handleModeSwitch} className="mode-switch-button">
          {isStopwatch ? <Timer className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          Switch to {isStopwatch ? 'Timer' : 'Stopwatch'}
        </button>
      </div>

      {/* Display the current time in HH:MM:SS format */}
      <div className="timer-display">{formatTime(time)}</div>

      {/* Input fields for hours, minutes, and seconds (only shown in Timer mode) */}
      {!isStopwatch && (
        <div className="timer-input-container">
          <input
            type="number"
            min="0"
            value={inputHours}
            onChange={(e) => setInputHours(parseInt(e.target.value) || 0)} // Update hours when the user types
            className="timer-input"
            placeholder="HH"
          />
          <span className="timer-separator">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(parseInt(e.target.value) || 0)} // Update minutes when the user types
            className="timer-input"
            placeholder="MM"
          />
          <span className="timer-separator">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(parseInt(e.target.value) || 0)} // Update seconds when the user types
            className="timer-input"
            placeholder="SS"
          />
        </div>
      )}

      {/* Buttons to control the timer */}
      <div className="timer-controls">
        {/* If it's a stopwatch or the timer has time left, show the play/pause button */}
        {isStopwatch || time > 0 ? (
          <button onClick={handleStartStop} className="timer-button">
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
        ) : (
          // If it's a timer and no time is set, show the "Start Timer" button
          <button onClick={startCountdownTimer} className="timer-button">
            Start Timer
          </button>
        )}

        {/* Button to reset the timer */}
        <button onClick={handleReset} className="timer-button">
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TimerUI;