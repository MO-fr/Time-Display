import React from "react";
import { Toaster, toast } from "sonner"; // Import Sonner

const ToastNoti = () => {
  return <Toaster position="bottom-right" richColors />; // Toast UI settings
};

// a Function to show toasts anywhere ont the site
export const showToast = (message, type = "success") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast.info(message);
  }
};

export default ToastNoti;
