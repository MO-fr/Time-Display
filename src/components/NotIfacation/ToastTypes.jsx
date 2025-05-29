import { Toaster } from "sonner";

// Default configuration for all toasts
const TOAST_CONFIG = {
  position: "bottom-left",
  richColors: false,
  closeButton: true,
  duration: 5000,
  expand: false,
  className: 'theme-aware-toast',
  visibleToasts: 1,
  toastOptions: {
    className: '',
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      color: 'var(--text-primary)',
      fontSize: '1rem',
      fontFamily: 'Poppins, sans-serif',
    }
  }
};

const ToastProvider = () => {
  return <Toaster {...TOAST_CONFIG} />;
};

ToastProvider.displayName = 'ToastProvider';

export default ToastProvider;