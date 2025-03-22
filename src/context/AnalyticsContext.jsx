import React, { createContext, useState, useContext, useEffect } from 'react';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [timerUsageData, setTimerUsageData] = useState([]);

  useEffect(() => {
    // Load initial data from localStorage
    const storedData = localStorage.getItem('timerUsage');
    if (storedData) {
      setTimerUsageData(JSON.parse(storedData));
    }
  }, []);

  const updateTimerUsage = () => {
    const today = new Date().toLocaleDateString();
    const newData = [...timerUsageData];
    const todayEntry = newData.find(item => item.time === today);

    if (todayEntry) {
      todayEntry.timers += 1;
    } else {
      newData.push({ time: today, timers: 1 });
      // Keep only last 7 days
      if (newData.length > 7) {
        newData.shift();
      }
    }

    setTimerUsageData(newData);
    localStorage.setItem('timerUsage', JSON.stringify(newData));
  };

  return (
    <AnalyticsContext.Provider value={{ timerUsageData, updateTimerUsage }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);