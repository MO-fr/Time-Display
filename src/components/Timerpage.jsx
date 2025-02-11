import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Timerpage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="timer-container">
      <div className="timer-card">
        {/* Timer Display */}
        <div className="timer-display">
          {formatTime(time)}
        </div>
        
        {/* Controls */}
        <div className="timer-controls">
          <button onClick={handleStartStop} className="timer-button">
            {isRunning ? <Pause /> : <Play />}
          </button>
          
          <button onClick={handleReset} className="timer-button">
            <RotateCcw />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timerpage;
