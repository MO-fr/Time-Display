import React, { useEffect } from "react";
import { toast } from "sonner";

//  timer completion notifications
const TimerCompletionToast = ({ isRunning, time, isStopwatch }) => {
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (!isStopwatch && time <= 1) {
          toast.success(`Time's up!`);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isStopwatch, time]);

  return null;
};

//achievement Toast notifications
export const showAchievementToast = (achievementId, achievementName, shownToasts) => {
  if (!shownToasts.current.has(achievementId)) {
    toast.success(`🏆 Achievement Unlocked: ${achievementName}!`, {
      position: "bottom-left"
    });
    shownToasts.current.add(achievementId);
  }
};

const ToastManager = (props) => {
  return <TimerCompletionToast {...props} />;
};

export default ToastManager;