import { toast } from "sonner";

/**
 * Base toast notification service
 * This file provides the core toast functionality that other services can use
 */
const ToastService = {
  /**
   * Show a success toast notification
   * @param {string} message - The message to display
   * @param {Object} options - Additional toast options
   */
  success: (message, options = {}) => {
    toast.success(message, {
      duration: 4000,
      position: 'bottom-left',
      className: 'base-toast',
      style: {
        background: 'var(--bg-card)',
        border: '2px solid var(--accent-color)',
        color: 'var(--text-primary)',
        boxShadow: '0 12px 32px var(--shadow-color)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '1rem'
      },
      ...options
    });
  },

  /**
   * Show an error toast notification
   * @param {string} message - The message to display
   * @param {Object} options - Additional toast options
   */
  error: (message, options = {}) => {
    toast.error(message, {
      duration: 5000,
      position: 'bottom-left',
      className: 'base-toast',
      style: {
        background: 'var(--bg-card)',
        border: '2px solid var(--error-color, #ef4444)',
        color: 'var(--text-primary)',
        boxShadow: '0 12px 32px var(--shadow-color)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '1rem'
      },
      ...options
    });
  },

  /**
   * Show a custom toast notification
   * @param {(props: { id: string; visible: boolean }) => React.ReactNode} render - Function that returns the content to display
   * @param {Object} options - Additional toast options
   */
  custom: (render, options = {}) => {
    if (typeof render !== 'function') {
      // If render is JSX directly, wrap it in a function
      const content = render;
      render = () => content;
    }

    toast.custom(render, {
      duration: 4000,
      position: 'bottom-left',
      className: 'base-toast',
      style: {
        background: 'var(--bg-card)',
        border: '2px solid var(--accent-color)',
        color: 'var(--text-primary)',
        boxShadow: '0 12px 32px var(--shadow-color)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '1rem'
      },
      ...options
    });
  }
};

export default ToastService;