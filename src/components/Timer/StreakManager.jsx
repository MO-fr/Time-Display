import React, { useEffect } from "react";
import { toast } from "sonner"; // Import Sonner's toast function

const StreakManager = ({ isRunning, time, isStopwatch }) => {
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (!isStopwatch && time <= 1) {
          toast.success(`Time's up!`); // Show toast when time is 1 second or less
        }
      }, 1000);
    }

    return () => clearInterval(intervalId); // Cleanup interval when component unmounts or dependencies change
  }, [isRunning, isStopwatch, time]); // Re-run effect when isRunning, isStopwatch, or time changes

  return null; // No UI to display
};

export default StreakManager;