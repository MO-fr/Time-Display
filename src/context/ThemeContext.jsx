import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../hooks/useTheme';

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Try to get theme from localStorage, fallback to default
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'default';
  });
  useEffect(() => {
    // Update localStorage and apply theme classes when theme changes
    localStorage.setItem('theme', currentTheme);
    
    // Apply theme class to body
    document.body.className = `${currentTheme}-theme`;
    
    // Apply theme class to root container for consistent theming
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.className = `${currentTheme}-theme`;
    }
  }, [currentTheme]);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
