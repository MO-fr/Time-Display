import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Timerpage = () => {
   const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${process.env.PUBLIC_URL}/css/Timerpage.css`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
    <div className="min-h-screen w-full flex items-center justify-center bg-red-50">
      <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-lg shadow-lg w-80">
        {/* Timer Display */}
        <div className="text-6xl font-bold text-red-600 font-mono">
          {formatTime(time)}
        </div>
        
        {/* Controls */}
        <div className="flex space-x-4">
          <button
            onClick={handleStartStop}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            {isRunning ? 
              <Pause className="w-6 h-6" /> : 
              <Play className="w-6 h-6" />
            }
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timerpage;