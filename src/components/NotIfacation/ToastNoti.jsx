import React from "react";
import { Toaster, toast } from "sonner"; // Import Sonner

const ToastNoti = () => {
  return <Toaster position="bottom-right" richColors />; // Toast UI settings
};

// ✅ Function to show toast messages anywhere
export const showToast = (message, type = "info") => {
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
