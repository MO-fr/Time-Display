import { useState } from 'react';
import { Palette, Moon, Sun, Droplet, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTheme, changeTheme } = useTheme();

  // Theme definitions with their unique properties
  const themes = [
    {
      name: 'Default',
      value: 'default',
      primaryColor: '#ef4444',
      icon: <Sun className="w-5 h-5" />,
      gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    },
    {
      name: 'Sunset',
      value: 'sunset',
      primaryColor: '#fb923c',
      icon: <Palette className="w-5 h-5" />,
      gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    },
    {
      name: 'Ocean',
      value: 'ocean',
      primaryColor: '#3b82f6',
      icon: <Droplet className="w-5 h-5" />,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    },
    {
      name: 'Forest',
      value: 'forest',
      primaryColor: '#22c55e',
      icon: <Moon className="w-5 h-5" />,
      gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    },
    {
      name: 'Galaxy',
      value: 'galaxy',
      primaryColor: '#8b5cf6',
      icon: <Sparkles className="w-5 h-5" />,
      gradient: 'linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%)',
    },
    {
      name: 'Candy',
      value: 'candy',
      primaryColor: '#f472b6',
      icon: <Palette className="w-5 h-5" />,
      gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    },
  ];

  const handleThemeChange = (selectedTheme) => {
    changeTheme(selectedTheme);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="themed-button"
        aria-label="Open theme selector"
      >
        <Palette className="w-5 h-5" />
        <span>Themes</span>
      </button>      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
            }}
          >
            <motion.div              className="modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }
              }}
              style={{
                zIndex: 10000,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95,
                transition: {
                  duration: 0.2
                }
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">Choose Theme</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="themed-button round"
                  aria-label="Close theme selector"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="theme-grid">
                {themes.map((theme, index) => (
                  <motion.button
                    key={theme.value}
                    onClick={() => handleThemeChange(theme.value)}
                    className="theme-button"
                    style={{
                      background: theme.gradient,
                      '--theme-color': theme.primaryColor
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.05 }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-selected={activeTheme === theme.value}
                  >
                    <div className="theme-button-content">
                      <div className="theme-button-icon">
                        {theme.icon}
                      </div>
                      <span className="theme-button-name">
                        {theme.name}
                      </span>
                    </div>
                    {activeTheme === theme.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <div className="theme-button-icon">
                          <Palette className="w-4 h-4" />
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSelector;