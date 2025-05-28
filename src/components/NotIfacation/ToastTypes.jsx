import { Toaster } from "sonner";

const TOAST_CONFIG = {
  position: "bottom-right",
  richColors: true,
  closeButton: true,
  duration: 5000
};

const ToastProvider = () => {
  return <Toaster {...TOAST_CONFIG} />;
};

ToastProvider.displayName = 'ToastProvider';

export default ToastProvider;