import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner"; // ✅ Import Sonner's toast function

const StreakManager = ({ isRunning, time, isStopwatch }) => {
  const toastShown = useRef(false); // ✅ Prevent multiple toasts in one session

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (!isStopwatch && time <= 1) {
          if (!toastShown.current) {
            toast.success(`Time's up!`);
            toastShown.current = true;
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isStopwatch, time]);

  // ✅ Reset toast tracking when the user starts the timer again or switches mode
  useEffect(() => {
    if (!isRunning || isStopwatch) {
      toastShown.current = false;
    }
  }, [isRunning, isStopwatch]);

  return null; // ✅ No UI to display
};

export default StreakManager;