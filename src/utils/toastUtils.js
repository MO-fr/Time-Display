import { toast } from "sonner";

/**
 * Shows an achievement toast notification
 * @param {string} achievementId - Unique identifier for the achievement
 * @param {string} achievementName - Name of the achievement to display
 * @param {React.MutableRefObject<Set<string>>} shownToasts - Ref containing set of shown toast IDs
 */
export const showAchievementToast = (achievementId, achievementName, shownToasts) => {
  if (!shownToasts.current.has(achievementId)) {
    toast.success(`🏆 Achievement Unlocked: ${achievementName}!`, {
      position: "bottom-left"
    });
    shownToasts.current.add(achievementId);
  }
};

/**
 * Shows different types of toast notifications
 * @param {string} message - Message to display in the toast
 * @param {'success' | 'error' | 'warning' | 'info'} type - Type of toast to show
 */
export const showToast = (message, type = "success") => {
  const options = {
    dismissible: true,
    duration: 5000
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      toast.info(message, options);
  }
};
