import { Toaster } from "sonner";

const TOAST_CONFIG = {
  position: "bottom-left",
  richColors: false,
  closeButton: true,
  duration: 5000,
  expand: true,
  className: 'theme-aware-toast',
  gap: 8,
  style: {
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    boxShadow: '0 8px 16px var(--shadow-color)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  toastOptions: {
    classNames: {
      toast: 'achievement-toast',
      success: 'success-toast',
      error: 'error-toast',
      loading: 'loading-toast',
    },
    style: {
      margin: '0.5rem'
    }
  }
};

const ToastProvider = () => {
  return <Toaster {...TOAST_CONFIG} />;
};

ToastProvider.displayName = 'ToastProvider';

export default ToastProvider;