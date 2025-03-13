import React, { useState, useEffect } from "react";

const SessionTracker = ({ timerState, formatTime }) => {
  // State for session history
  const [sessions, setSessions] = useState(() => {
    // Load sessions from localStorage on initial render
    const savedSessions = localStorage.getItem('timerSessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('timerSessions', JSON.stringify(sessions));
  }, [sessions]);

  // Add a new completed session to history
  const addSession = (newSession = null, clearAll = false) => {
    if (clearAll) {
      setSessions([]); 
      return;
    }
    
    if (newSession) {
      setSessions((prev) => [newSession, ...prev]);
    }
  };
                              
  // Record completed session when countdown reaches zero
  useEffect(() => {
    if (!timerState.isStopwatch && timerState.time === 0 && timerState.initialTime > 0) {
      const completedSession = {
        isStopwatch: false,
        initialTime: timerState.initialTime,
        formattedTime: formatTime(timerState.initialTime),
        timestamp: new Date().getTime()
      };
      addSession(completedSession);
    }
  }, [timerState.time, timerState.isStopwatch, timerState.initialTime]);

  // Record session if stopping a running stopwatch with time > 0
  useEffect(() => {
    if (timerState.isStopwatch && !timerState.isRunning && timerState.time > 0) {
      const completedSession = {
        isStopwatch: true,
        initialTime: timerState.time,
        formattedTime: formatTime(timerState.time),
        timestamp: new Date().getTime()
      };
      addSession(completedSession);
    }
  }, [timerState.isRunning, timerState.isStopwatch, timerState.time]);

  return (
    <div>
      {/* Render session history or any other UI related to session tracking */}
    </div>
  );
};

export default SessionTracker;