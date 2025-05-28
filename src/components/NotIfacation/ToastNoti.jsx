import { useEffect } from "react";
import PropTypes from 'prop-types';
import { toast } from "sonner";

const TimerCompletionToast = ({ isRunning, time, isStopwatch }) => {
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (!isStopwatch && time <= 1) {
          toast.success("Time's up!");
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isStopwatch, time]);

  return null;
};

TimerCompletionToast.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  isStopwatch: PropTypes.bool.isRequired,
};

const ToastManager = ({ isRunning, time, isStopwatch }) => {
  return <TimerCompletionToast 
    isRunning={isRunning} 
    time={time} 
    isStopwatch={isStopwatch} 
  />;
};

ToastManager.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  isStopwatch: PropTypes.bool.isRequired,
};

export default ToastManager;