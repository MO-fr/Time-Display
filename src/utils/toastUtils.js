import { toast } from "sonner";

/**
 * Shows different types of toast notifications
 * @param {string} message - Message to display in the toast
 * @param {'success' | 'error' | 'warning' | 'info'} type - Type of toast to show
 */
export const showToast = (message, type = "success") => {
  const options = {
    dismissible: true,
    duration: 5000,
    position: "bottom-right"
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
