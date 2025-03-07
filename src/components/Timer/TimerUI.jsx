import React from "react";
import { Play, Pause, RotateCcw, Timer, Clock } from "lucide-react"; // Icons for buttons

const TimerUI = ({
  timerState, // Contains time, isRunning, and isStopwatch
  inputTime, // Contains inputHours, inputMinutes, inputSeconds
  formatTime, // Function to format time into HH:MM:SS
  handleStartStop, // Function to start/stop timer
  handleReset, // Function to reset timer
  handleModeSwitch, // Function to switch between stopwatch and countdown modes
  startCountdownTimer, // Function to start countdown
  updateInputTime, // Function to update input fields
}) => {
  return (
    <div className="timer-card">
      {/* Switch between Stopwatch & Countdown Mode */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={handleModeSwitch} className="mode-switch-button">
          {timerState.isStopwatch ? <Timer className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          Switch to {timerState.isStopwatch ? "Timer" : "Stopwatch"}
        </button>
      </div>

      <br />

      {/* Display current time in HH:MM:SS format */}
      <div className="timer-display">{formatTime(timerState.time)}</div>

      {/* Input fields for countdown timer (Only show when in timer mode) */}
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
      )}

      {/* Timer Control Buttons */}
      <div className="timer-controls">
        {/* Show Play/Pause button if it's a stopwatch or countdown has time left */}
        {timerState.isStopwatch || timerState.time > 0 ? (
          <button onClick={handleStartStop} className="timer-button">
            {timerState.isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
        ) : (
          // If it's a countdown and no time is set, show the "Start Timer" button
          <button onClick={startCountdownTimer} className="timer-button">
            Start Timer
          </button>
        )}

        {/* Reset Button */}
        <button onClick={handleReset} className="timer-button">
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TimerUI;
