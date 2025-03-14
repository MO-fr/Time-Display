import React from "react";
import { Toaster, toast } from "sonner"; // Import Sonner

const ToastNoti = () => {
  return <Toaster position="bottom-right" richColors />; // Toast UI settings
};

// a Function to show toasts anywhere on the site, also a way look at the syntax of the differnt kinds of toast notis-
//and grab it when i want to use it in the future. 
export const showToast = (message, type = "success") => {
  switch (type) {
    case "success":
      toast.success(message); // the toast i use for the timer and when its complteted.
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
