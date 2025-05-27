import { Toaster, toast } from "sonner";

const ToastNoti = () => {
  return (
    <Toaster 
      position="bottom-right" 
      richColors 
      closeButton
      duration={5000}
    />
  );
};

// a Function to show toasts anywhere on the site, also a way look at the syntax of the differnt kinds of toast notis-
//and grab it when i want to use it in the future. 
export const showToast = (message, type = "success") => {
  switch (type) {
    case "success":
      toast.success(message, {
        dismissible: true,
        duration: 5000
      });
      break;
    case "error":
      toast.error(message, {
        dismissible: true,
        duration: 5000
      });
      break;
    case "warning":
      toast.warning(message, {
        dismissible: true,
        duration: 5000
      });
      break;
    default:
      toast.info(message, {
        dismissible: true,
        duration: 5000
      });
  }
};

export default ToastNoti;