import { motion } from "framer-motion";
import ToastService from "./ToastNoti";

/**
 * Show a timer completion notification
 * @param {number} duration - The completed timer duration in seconds
 */
export const showTimerCompletionToast = (duration) => {
  const minutes = Math.floor(duration / 60);
  const message = `Timer Complete: ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;

  ToastService.custom(
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>⏰</span>
        <div>
          <p style={{ margin: 0, fontSize: '1rem' }}>{message}</p>
        </div>
      </div>
    </motion.div>
  );
};
